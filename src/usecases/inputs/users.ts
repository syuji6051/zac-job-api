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

export interface PutZacLoginInput {
  getUserName(): string
  getZacTenantId(): string
  getZacUserId(): string
  getZacPassword(): string
}

export interface PutObcLoginInput {
  getUserName(): string
  getObcTenantId(): string
  getObcUserId(): string
  getObcPassword(): string
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
