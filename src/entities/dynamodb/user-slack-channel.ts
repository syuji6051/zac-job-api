import {
  table, hashKey, attribute,
} from '@aws/dynamodb-data-mapper-annotations';

const { STAGE } = process.env;

@table(`zac-job-user-slack-channel-${STAGE}`)
// eslint-disable-next-line import/prefer-default-export
export class UserSlackChannelRecord {
  @hashKey({
    attributeName: 'user_id',
    keyType: 'HASH',
  })
  userId: string;

  @attribute({
    attributeName: 'send_punch_channels',
  })
  sendPunchChannels: string [];
}
