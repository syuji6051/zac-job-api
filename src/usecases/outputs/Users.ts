/* eslint-disable no-unused-vars */
// eslint-disable-next-line import/no-extraneous-dependencies
import { APIGatewayProxyResult } from 'aws-lambda';

import { User, Users } from '@/src/entities/users';

export interface UserCreateOutput {
  success(user: User): APIGatewayProxyResult;
}

export interface UserListOutput {
  success(users: Users): APIGatewayProxyResult;
}

export interface PutZacLoginOutput {
  success(): APIGatewayProxyResult;
}

export interface PutObcLoginOutput {
  success(): APIGatewayProxyResult;
}
export interface ZacWorkRegisterOutput {
  success(): APIGatewayProxyResult;
}
