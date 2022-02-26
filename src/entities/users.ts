/* eslint-disable camelcase */

export interface User {
  userName?: string;
  enabled?: boolean;
  userStatus?: string;
  isAdmin: boolean;
}

export interface GetUsersListOutput {
  paginationToken: string | undefined;
  users: User[];
}

export interface GetUserInfoRequest {
  user_id: string
}

export interface UserInfo {
  userId: string;
  obcTenantId?: string | null;
  obcUserId?: string | null;
  zacTenantId?: string | null;
  zacUserId?: string | null;
  slackUserName?: string | null;
}

export interface ZacUserLogin {
  userId: string;
  zacUserId: string;
  zacPassword: string;
}

export interface ZacUserRequest {
  zac_tenant_id: string
  zac_user_id: string
  zac_password: string
}

export interface ZacInfo {
  zacTenantId: string
  zacUserId: string
  zacPassword: string
}

export interface ObcInfoRequest {
  obc_tenant_id: string
  obc_user_id: string
  obc_password: string
}

export interface ObcInfo {
  obcTenantId: string
  obcUserId: string
  obcPassword: string
}
export interface Attribute {
  tenantId: string
  userId: string
  password: string
}
