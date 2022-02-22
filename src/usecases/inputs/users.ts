import { EventV2CognitoAuthorizer } from '@/src/adapters/http/request/authorizer';
import { ObcInfo, ZacInfo } from '@/src/entities/users';
import { Work, WorkMinute } from '@syuji6051/zac-client';

export interface Authorizer {
  getUserId(): string;
}

export interface UserCreateInput {
  getUserName(): string;
  getPassword(): string;
}

export interface UserListInput {
  getPaginationToken(): string;
}

export interface GetUserInfoInput extends EventV2CognitoAuthorizer {
}

export interface PutZacInfoInput extends EventV2CognitoAuthorizer {
  getZacInfo(): ZacInfo;
}

export interface PutObcInfoInput extends EventV2CognitoAuthorizer {
  getObcInfo(): ObcInfo;
}
export interface ZacWorkRegisterInput {
  getUserName(): string;
  getWorkDate(): Date
  getWorkStartHour(): number
  getWorkStartMinute(): WorkMinute
  getWorkEndHour(): number
  getWorkEndMinute(): WorkMinute
  getWorkBreakHour(): number
  getWorkBreakMinute(): WorkMinute
  getWorks(): Work []
}
