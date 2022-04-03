/* eslint-disable no-unused-vars */
import { works } from '@syuji6051/zac-job-interface';

import { UserSlackChannelRecord } from '@/src/entities/dynamodb/user-slack-channel';
import { UserInfo as UserInfoModel } from '@/src/entities/slack';

export interface SendPunchWorkMessageInput {
  userId: string
  botChannel: string
  token?: string
  workType: works.WorkType
}

export interface Slack {
  // eslint-disable-next-line no-unused-vars
  sendPunchWorkMessages(input: SendPunchWorkMessageInput): Promise<void>
  getUserInfo(code: string): Promise<UserInfoModel>
  sendMessage(channel: string, text: string, token?: string): Promise<void>
}
