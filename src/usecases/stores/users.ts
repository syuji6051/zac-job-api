/* eslint-disable no-unused-vars */
import { UserAttributesRecord } from '@/src/entities/dynamodb/user-attributes';
import { UserInfo, GetUsersListOutput } from '@/src/entities/users';

export interface Users {
  create(email: string, password: string): Promise<void>;
  getUsersList(paramPaginationToken: string | undefined): Promise<GetUsersListOutput>;
  getUserInfo(userId: string): Promise<UserInfo>;
  setAttribute(user: UserAttributesRecord): Promise<void>
  getUserFromSlackId(slackUserId: string): Promise<UserAttributesRecord | undefined>
}
