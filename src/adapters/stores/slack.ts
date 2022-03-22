import { inject, injectable } from 'inversify';
import { secrets } from '@syuji6051/zac-job-interface';

import { TYPES } from '@/src/providers/container';
import SlackUserInfo from '@/src/slack/user-info';
import SlackMessage from '@/src/slack/message';
import { Slack as ISlack } from '@/src/usecases/stores/slack';
import { UserInfo as UserInfoModel } from '@/src/entities/slack';

@injectable()
export default class Slack implements ISlack {
  userInfo: SlackUserInfo;

  message: SlackMessage;

  constructor(
    @inject(TYPES.ASM_VALUES) private secret: secrets.SecretsValues,
  ) {
    this.userInfo = new SlackUserInfo(secret);
    this.message = new SlackMessage(secret);
  }

  public async getUserInfo(code: string): Promise<UserInfoModel> {
    const { access_token: accessToken } = await this.userInfo.getAccessToken(code);
    if (accessToken == null) throw new Error('Slack AccessToken is Empty');
    const { user, user_id: userId } = await this.userInfo.getUserId(accessToken);
    if (user == null || userId == null) throw new Error('Slack User is Empty');
    return {
      userId,
      userName: user,
      accessToken,
    };
  }

  public async sendMessage(channel: string, text: string, token?: string) {
    await this.message.sendMessage({
      channel,
      text,
      token: token === undefined ? this.secret.SLACK_TOKEN : token,
    });
  }
}
