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
    attributeName: 'zac_tenant_id',
  })
  zacTenantId?: string | null;

  @attribute({
    attributeName: 'zac_user_id',
  })
  zacUserId?: string | null;

  @attribute({
    attributeName: 'zac_password',
  })
  zacPassword?: string | null;

  @attribute({
    attributeName: 'obc_tenant_id',
  })
  obcTenantId?: string | null;

  @attribute({
    attributeName: 'obc_user_id',
  })
  obcUserId?: string | null;

  @attribute({
    attributeName: 'obc_password',
  })
  obcPassword?: string | null;

  @attribute({
    attributeName: 'slack_user_id',
  })
  slackUserId?: string | null;

  @attribute({
    attributeName: 'slack_user_name',
  })
  slackUserName?: string | null;

  @attribute({
    attributeName: 'slack_access_token',
  })
  slackAccessToken?: string | null
}
