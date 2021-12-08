import {
  table, hashKey, attribute,
} from '@aws/dynamodb-data-mapper-annotations';

const { STAGE } = process.env;

@table(`zac-job-user-attributes-${STAGE}`)
// eslint-disable-next-line import/prefer-default-export
export class UserAttributesRecord {
  @hashKey({
    attributeName: 'user_id',
    keyType: 'HASH',
  })
  userId: string;

  @attribute({
    attributeName: 'slack_user_id',
  })
  slackUserId: string;

  @attribute({
    attributeName: 'slack_user_name',
  })
  slackUserName: string;

  @attribute({
    attributeName: 'slack_access_token',
  })
  slackAccessToken: string
}
