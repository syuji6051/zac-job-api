/* eslint-disable no-unused-vars */
import { UserInfo as UserInfoModel } from '@/src/entities/slack';

export interface Slack {
  // eslint-disable-next-line no-unused-vars
  getUserInfo(code: string): Promise<UserInfoModel>
  sendMessage(channel: string, text: string, token?: string): Promise<void>
}
