import { APIGatewayProxyResult } from "aws-lambda";
import {
  UserCreateOutput as IUserCreateOutput,
  UserListOutput as IUserListOutput,
} from '../../../usecases/outputs/Users';
import {
  User as UserEntity,
  Users as UsersEntity,
} from 'app/entities/Users';
import { success, invalidError } from '../../../http/views/response';

export class UserCreateOutput implements IUserCreateOutput {
  public success(user: UserEntity): APIGatewayProxyResult {
    return success(user);
  }

  public error400(error: Error) {
    return invalidError(error);
  }
}

export class UserListOutput implements IUserListOutput {
  public success(users: UsersEntity): APIGatewayProxyResult {
    return success(users);
  }
}