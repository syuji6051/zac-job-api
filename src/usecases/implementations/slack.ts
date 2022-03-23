import { APIGatewayProxyResult } from 'aws-lambda';
import { injectable } from 'inversify';
import { secrets } from '@syuji6051/zac-job-interface';
import { errors } from '@syuji6051/zac-job-library';

import { container, TYPES } from '@/src/providers/container';
import { Slack as ISlack } from '@/src/usecases/slack';
import { Slack as SlackStore } from '@/src/usecases/stores/slack';
import { Users as UserStore } from '@/src/usecases/stores/users';
import { Works as WorkStore } from '@/src/usecases/stores/works';
import { SetUserAttributeInput, ActionEventsInput, BotMessageInput } from '@/src/usecases/inputs/slack';
import { SetUserAttributeOutput, ActionEventsOutput } from '@/src/usecases/outputs/slack';
import { publishPunchWork } from '@/src/helper/sns';
import { choiceWorkMessage, getWorkTypeName, sendSlackError } from '@/src/helper/slack';

@injectable()
export default class Slack implements ISlack {
  private slack: SlackStore;

  private user: UserStore;

  private work: WorkStore;

  secrets: secrets.SecretsValues;

  constructor() {
    this.secrets = container.get<secrets.SecretsValues>(TYPES.ASM_VALUES);
    this.slack = container.get<SlackStore>(TYPES.STORE_SLACK);
    this.user = container.get<UserStore>(TYPES.STORE_USERS);
    this.work = container.get<WorkStore>(TYPES.STORE_WORKS);
  }

  public async setUserAttributes(
    input: SetUserAttributeInput,
    output: SetUserAttributeOutput,
  ): Promise<APIGatewayProxyResult> {
    const code = input.getCode();
    const userId = input.getUserName();

    const user = await this.slack.getUserInfo(code);
    await this.user.setAttribute({
      userId,
      slackUserId: user.userId,
      slackUserName: user.userName,
      slackAccessToken: user.accessToken,
    });
    return output.success(user);
  }

  public async actionEvents(
    input: ActionEventsInput, output: ActionEventsOutput,
  ): Promise<APIGatewayProxyResult> {
    const request = input.getRequest();
    if (this.secrets.SLACK_VERIFICATION_TOKEN !== request.token) {
      throw new errors.ValidationError('invalid token');
    }

    if (request.type === 'url_verification') {
      const { challenge } = request;
      return output.success({ challenge });
    }

    const {
      event: {
        user, channel, bot_id: botId, text,
      },
    } = request;

    if (botId === undefined) {
      const workType = choiceWorkMessage(text);
      if (workType == null) {
        return output.success({});
      }

      const userInfo = await this.user.getUserFromSlackId(user);
      if (userInfo === undefined) {
        throw await sendSlackError(this.secrets, channel, 'OBCとSlackとの連携が完了していません');
      }

      const {
        userId, slackAccessToken: token, obcTenantId, obcUserId, obcPassword,
      } = userInfo;

      if (obcTenantId == null || obcUserId == null || obcPassword == null) {
        throw await sendSlackError(this.secrets, channel, 'OBC必須項目が足りていません');
      }
      await this.slack.sendMessage(channel, `${getWorkTypeName(workType)} 処理を受けつけました`);

      await publishPunchWork({
        userId, obcTenantId, obcUserId, obcPassword, token, channel, workType,
      });
    }
    return output.success({});
  }

  public async botMessage(input: BotMessageInput) {
    const messages = input.getInput();
    for (const { chanel, message, token } of messages) {
      // eslint-disable-next-line no-await-in-loop
      await this.slack.sendMessage(chanel, message, token);
    }
  }
}
