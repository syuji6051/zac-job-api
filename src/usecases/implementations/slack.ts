import { APIGatewayProxyResult } from 'aws-lambda';
import { injectable } from 'inversify';
import { errors } from '@syuji6051/zac-job-library';

import { container, TYPES } from '@/src/providers/container';
import { Slack as ISlack } from '@/src/usecases/slack';
import { Slack as SlackStore } from '@/src/usecases/stores/slack';
import { Users as UserStore } from '@/src/usecases/stores/users';
import { SetUserAttributeInput, ActionEventsInput } from '@/src/usecases/inputs/slack';
import { SetUserAttributeOutput, ActionEventsOutput } from '@/src/usecases/outputs/slack';
import { SecretsValues } from '@/src/entities/environments';

@injectable()
export default class Slack implements ISlack {
  private slack: SlackStore;

  private user: UserStore;

  secrets: SecretsValues;

  constructor() {
    this.secrets = container.get<SecretsValues>(TYPES.ASM_VALUES);
    this.slack = container.get<SlackStore>(TYPES.STORE_SLACK);
    this.user = container.get<UserStore>(TYPES.STORE_USERS);
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

    const { token, event: { user, channel, bot_id: botId } } = request;

    if (botId === undefined) {
      const userInfo = await this.user.getUserFromSlackId(user);
      if (userInfo === undefined) throw new Error('User not found');
      await this.slack.sendMessage(token, channel, '受け付けました');
    }
    return output.success({});
  }
}
