// eslint-disable-next-line import/no-extraneous-dependencies
import { APIGatewayProxyResult } from 'aws-lambda';
import { views } from '@syuji6051/zac-job-library';
import {
  User as UserEntity,
  UserInfo,
  Users as UsersEntity,
} from '@/src/entities/users';
import {
  UserCreateOutput as IUserCreateOutput,
  UserListOutput as IUserListOutput,
  GetUserInfoOutput as IGetUserInfoOutput,
  PutZacInfoOutput as IPutZacInfoOutput,
  PutObcInfoOutput as IPutObcInfoOutput,
  ZacWorkRegisterOutput as IZacWorkRegisterOutput,
} from '@/src/usecases/outputs/users';

export class UserCreateOutput implements IUserCreateOutput {
  public success(user: UserEntity): APIGatewayProxyResult {
    return views.success(user);
  }
}

export class UserListOutput implements IUserListOutput {
  public success(users: UsersEntity): APIGatewayProxyResult {
    return views.success(users);
  }
}

export class GetUserInfoOutput implements IGetUserInfoOutput {
  public success(userInfo: UserInfo): APIGatewayProxyResult {
    return views.success(userInfo);
  }
}

export class PutZacInfoOutput implements IPutZacInfoOutput {
  public success(): APIGatewayProxyResult {
    return views.success();
  }
}

export class PutObcInfoOutput implements IPutObcInfoOutput {
  public success(): APIGatewayProxyResult {
    return views.success();
  }
}
export class ZacWorkRegisterOutput implements IZacWorkRegisterOutput {
  public success(): APIGatewayProxyResult {
    return views.success();
  }
}
