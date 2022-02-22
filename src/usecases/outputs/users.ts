/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import { APIGatewayProxyResult } from 'aws-lambda';

import { User, UserInfo, Users } from '@/src/entities/users';

export interface UserCreateOutput {
  success(user: User): APIGatewayProxyResult;
}

export interface UserListOutput {
  success(users: Users): APIGatewayProxyResult;
}

export interface GetUserInfoOutput {
  success(userInfo: UserInfo): APIGatewayProxyResult;
}

export interface PutZacInfoOutput {
  success(): APIGatewayProxyResult;
}

export interface PutObcInfoOutput {
  success(): APIGatewayProxyResult;
}
export interface ZacWorkRegisterOutput {
  success(): APIGatewayProxyResult;
}
