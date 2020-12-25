// eslint-disable-next-line import/no-extraneous-dependencies
import { APIGatewayProxyResult } from 'aws-lambda';
import {
  User as UserEntity,
  Users as UsersEntity,
} from '@/entities/Users';
import {
  UserCreateOutput as IUserCreateOutput,
  UserListOutput as IUserListOutput,
  PutZacLoginOutput as IPutZacLoginOutput,
  ZacWorkRegisterOutput as IZacWorkRegisterOutput,
} from '@/usecases/outputs/Users';
import { success } from '@/views/response';

export class UserCreateOutput implements IUserCreateOutput {
  public success(user: UserEntity): APIGatewayProxyResult {
    return success(user);
  }
}

export class UserListOutput implements IUserListOutput {
  public success(users: UsersEntity): APIGatewayProxyResult {
    return success(users);
  }
}

export class PutZacLoginOutput implements IPutZacLoginOutput {
  public success(): APIGatewayProxyResult {
    return success();
  }
}

export class ZacWorkRegisterOutput implements IZacWorkRegisterOutput {
  public success(): APIGatewayProxyResult {
    return success();
  }
}
