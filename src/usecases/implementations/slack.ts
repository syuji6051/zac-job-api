import { APIGatewayProxyResult } from 'aws-lambda';
import { injectable } from 'inversify';
import { errors } from '@syuji6051/zac-job-library';

import { container, TYPES } from '@/src/providers/container';
import { Slack as ISlack } from '@/src/usecases/slack';
import { Slack as SlackStore } from '@/src/usecases/stores/slack';
import { Users as UserStore } from '@/src/usecases/stores/users';
import { Works as WorkStore } from '@/src/usecases/stores/works';
import { SetUserAttributeInput, ActionEventsInput, BotMessageInput } from '@/src/usecases/inputs/slack';
import { SetUserAttributeOutput, ActionEventsOutput } from '@/src/usecases/outputs/slack';
import { SecretsValues } from '@/src/entities/environments';
import { publishBotMessage } from '@/src/helper/sns';
import { choiceWorkMessage, getWorkTypeName } from '@/src/helper/slack';

@injectable()
export default class Slack implements ISlack {
  private slack: SlackStore;

  private user: UserStore;

  private work: WorkStore;

  secrets: SecretsValues;

  constructor() {
    this.secrets = container.get<SecretsValues>(TYPES.ASM_VALUES);
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
    input: ActionEventsInput,
    output: ActionEventsOutput,
  ): Promise<APIGatewayProxyResult> {
    const request = input.getRequest();
    if (this.secrets.SLACK_VERIFICATION_TOKEN !== request.token) {
      throw new errors.ValidationError('invalid token');
    }

    if (request.type === 'url_verification') {
      const { challenge } = request;
      return output.success({
        challenge,
      });
    }

    const {
      event: {
        user, channel, bot_id: botId, text,
      },
    } = request;

    if (botId === undefined) {
      const userInfo = await this.user.getUserFromSlackId(user);
      if (userInfo === undefined) throw new Error('User not found');
      const { userId } = userInfo;
      const workType = choiceWorkMessage(text);
      if (workType) {
        await publishBotMessage(channel, `${getWorkTypeName(workType)} 処理を受けつけました`);
        await this.work.workPunch(userId, workType);
      }
    }
    return output.success({});
  }

  public async botMessage(
    input: BotMessageInput,
  ) {
    const { SLACK_TOKEN } = this.secrets;
    const messages = input.getInput();
    for (const { chanel, message } of messages) {
      // eslint-disable-next-line no-await-in-loop
      await this.slack.sendMessage(SLACK_TOKEN, chanel, message);
    }
  }
}
