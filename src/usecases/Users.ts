/* eslint-disable no-unused-vars */
import { APIGatewayProxyResult } from 'aws-lambda';

import {
  UserCreateInput, UserListInput, PutZacLoginInput, ZacWorkRegisterInput,
} from '@/usecases/inputs/Users';
import {
  UserCreateOutput, UserListOutput, PutZacLoginOutput, ZacWorkRegisterOutput,
} from '@/usecases/outputs/Users';

export interface Users {
  create(input: UserCreateInput, output: UserCreateOutput): Promise<APIGatewayProxyResult>;
  list(input: UserListInput, output: UserListOutput): Promise<APIGatewayProxyResult>;
  putZacLogin(input: PutZacLoginInput, output: PutZacLoginOutput): Promise<APIGatewayProxyResult>;
  ZacWorkRegister(
    input: ZacWorkRegisterInput, output: ZacWorkRegisterOutput
  ): Promise<APIGatewayProxyResult>;
}
