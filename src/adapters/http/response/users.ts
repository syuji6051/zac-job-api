// eslint-disable-next-line import/no-extraneous-dependencies
import { APIGatewayProxyResult } from 'aws-lambda';
import snakecaseKeys from 'snakecase-keys';
import { views } from '@syuji6051/zac-job-library';
import { UserInfo, GetUsersListOutput as EntityGetUsersListOutput } from '@/src/entities/users';
import {
  UserCreateOutput as IUserCreateOutput,
  GetUsersListOutput as IGetUsersListOutput,
  GetUserInfoOutput as IGetUserInfoOutput,
  PutZacInfoOutput as IPutZacInfoOutput,
  PutObcInfoOutput as IPutObcInfoOutput,
  ZacWorkRegisterOutput as IZacWorkRegisterOutput,
} from '@/src/usecases/outputs/users';

export class UserCreateOutput implements IUserCreateOutput {
  public success(): APIGatewayProxyResult {
    return views.success();
  }
}

export class GetUsersListOutput implements IGetUsersListOutput {
  public success(users: EntityGetUsersListOutput): APIGatewayProxyResult {
    return views.success(snakecaseKeys(users, { deep: true }));
  }
}

export class GetUserInfoOutput implements IGetUserInfoOutput {
  public success({
    userId, obcUserId, obcTenantId, zacUserId, zacTenantId, slackUserName,
  }: UserInfo): APIGatewayProxyResult {
    return views.success(snakecaseKeys({
      userId, obcUserId, obcTenantId, zacUserId, zacTenantId, slackUserName,
    }));
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
