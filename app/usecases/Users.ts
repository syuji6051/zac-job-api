import { UserCreateInput, UserListInput } from './inputs/Users';
import { UserCreateOutput, UserListOutput } from './outputs/Users';
import { APIGatewayProxyResult } from 'aws-lambda';

export interface Users {
  create(input: UserCreateInput, output: UserCreateOutput): Promise<APIGatewayProxyResult>;
  list(input: UserListInput, output: UserListOutput): Promise<APIGatewayProxyResult>;
};