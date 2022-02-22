/* eslint-disable no-unused-vars */
import { APIGatewayProxyResult } from 'aws-lambda';

import {
  UserCreateInput, UserListInput, PutZacInfoInput, PutObcInfoInput, GetUserInfoInput,
} from '@/src/usecases/inputs/users';
import {
  UserCreateOutput, UserListOutput, PutZacInfoOutput, PutObcInfoOutput, GetUserInfoOutput,
} from '@/src/usecases/outputs/users';

export interface Users {
  create(input: UserCreateInput, output: UserCreateOutput): Promise<APIGatewayProxyResult>;
  list(input: UserListInput, output: UserListOutput): Promise<APIGatewayProxyResult>;
  getUserInfo(input: GetUserInfoInput, output: GetUserInfoOutput): Promise<APIGatewayProxyResult>;
  putZacInfo(input: PutZacInfoInput, output: PutZacInfoOutput): Promise<APIGatewayProxyResult>;
  putObcInfo(input: PutObcInfoInput, output: PutObcInfoOutput): Promise<APIGatewayProxyResult>;
}
