/* eslint-disable camelcase */

import { z } from '@/../zac-job-interface/node_modules/zod/lib';

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
  obcPassword?: string | null;
  zacTenantId?: string | null;
  zacUserId?: string | null;
  zacPassword?: string | null;
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

export const zZacInfo = z.object({
  zacTenantId: z.string(),
  zacUserId: z.string(),
  zacPassword: z.string(),
});

export type ZacInfo = z.infer<typeof zZacInfo>

export interface ObcInfoRequest {
  obc_tenant_id: string
  obc_user_id: string
  obc_password: string
}

export const zObcInfo = z.object({
  obcTenantId: z.string(),
  obcUserId: z.string(),
  obcPassword: z.string(),
});

export type ObcInfo = z.infer<typeof zObcInfo>

export interface Attribute {
  tenantId: string
  userId: string
  password: string
}
