/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import { APIGatewayProxyResult } from 'aws-lambda';

import { User, UserInfo, GetUsersListOutput as IGetUsersListOutput } from '@/src/entities/users';

export interface UserCreateOutput {
  success(): APIGatewayProxyResult;
}

export interface GetUsersListOutput {
  success(users: IGetUsersListOutput): APIGatewayProxyResult;
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
