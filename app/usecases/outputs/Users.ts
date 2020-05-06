import { User, Users } from 'app/entities/Users';
import { APIGatewayProxyResult } from 'aws-lambda';

export interface UserCreateOutput {
  success(user: User): APIGatewayProxyResult;
  error400(error: Error): APIGatewayProxyResult;
}

export interface UserListOutput {
  success(users: Users): APIGatewayProxyResult;
}