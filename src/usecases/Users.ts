/* eslint-disable no-unused-vars */
import { APIGatewayProxyResult } from 'aws-lambda';

import {
  UserCreateInput, UserListInput, PutZacLoginInput, PutObcLoginInput, ZacWorkRegisterInput,
} from '@/src/usecases/inputs/users';
import {
  UserCreateOutput, UserListOutput, PutZacLoginOutput, PutObcLoginOutput, ZacWorkRegisterOutput,
} from '@/src/usecases/outputs/users';

export interface Users {
  create(input: UserCreateInput, output: UserCreateOutput): Promise<APIGatewayProxyResult>;
  list(input: UserListInput, output: UserListOutput): Promise<APIGatewayProxyResult>;
  putZacLogin(input: PutZacLoginInput, output: PutZacLoginOutput): Promise<APIGatewayProxyResult>;
  putObcLogin(input: PutObcLoginInput, output: PutObcLoginOutput): Promise<APIGatewayProxyResult>;
  ZacWorkRegister(
    input: ZacWorkRegisterInput, output: ZacWorkRegisterOutput
  ): Promise<APIGatewayProxyResult>;
}
