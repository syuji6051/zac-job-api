import { inject, injectable } from 'inversify';
import { secrets } from '@syuji6051/zac-job-interface';
import { logger } from '@syuji6051/zac-job-library';

import { TYPES } from '@/src/providers/container';
import SlackUserInfo from '@/src/slack/user-info';
import SlackMessage from '@/src/slack/message';
import UserSlackChannel from '@/src/database/slack';
import { SendPunchWorkMessageInput, Slack as ISlack } from '@/src/usecases/stores/slack';
import { UserInfo as UserInfoModel } from '@/src/entities/slack';
import { getWorkTypeIcon } from '@/src/helper/slack';

@injectable()
export default class Slack implements ISlack {
  userInfo: SlackUserInfo;

  message: SlackMessage;

  userSlackChannel: UserSlackChannel;

  constructor(
    @inject(TYPES.ASM_VALUES) private secret: secrets.SecretsValues,
  ) {
    this.userInfo = new SlackUserInfo(secret);
    this.message = new SlackMessage(secret);
    this.userSlackChannel = new UserSlackChannel();
  }

  public async sendPunchWorkMessages({
    userId, botChannel, workType, token,
  }: SendPunchWorkMessageInput) {
    if (token === undefined) {
      await this.sendMessage(botChannel, 'Slack連携情報が登録されていないため、チャンネルには送信できませんでした');
      return;
    }

    const res = await this.userSlackChannel.get(userId);
    logger.debug(`userSlackChannel: ${res.sendPunchChannels}`);
    if (res.sendPunchChannels == null) return;
    await Promise.all(res.sendPunchChannels.map((channel) => this.sendMessage(
      channel, getWorkTypeIcon(workType), token,
    )));
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
      channel, text, token,
    });
  }
}
