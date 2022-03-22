import { errors, validation } from '@syuji6051/zac-job-library';

import {
  UserCreateInput as IUserCreateInput,
  GetUsersListInput as IGetUsersListInput,
  GetUserInfoInput as IGetUserInfoInput,
  PutZacInfoInput as IPutZacInfoInput,
  PutObcInfoInput as IPutObcInfoInput,
} from '@/src/usecases/inputs/users';
import {
  ZacInfo, ObcInfo, zZacInfo, zObcInfo,
} from '@/src/entities/users';
import { APIGatewayProxyEventV2Authorizer } from '@/src/entities/authorizer';
import { EventV2CognitoAuthorizer } from '@/src/adapters/http/request/authorizer';
import camelcaseKeys from 'camelcase-keys';
import { APIGatewayProxyEventV2 } from 'aws-lambda';

class UserInput {
  headers?: { [name: string]: string }

  constructor(
    headers?: { [name: string]: string },
  ) {
    this.headers = headers;
  }

  protected getAuthUserId(): string | undefined {
    return this.headers && this.headers.Authorization;
  }
}

export class UserCreateInput extends UserInput implements IUserCreateInput {
  private username: string;

  private password: string;

  public constructor(
    _headers: { [name: string]: string },
    eventBody: { [field: string]: any },
  ) {
    super();
    this.username = eventBody.username;
    this.password = eventBody.password;
  }

  public getUserName(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }
}

export class GetUsersListInput extends EventV2CognitoAuthorizer implements IGetUsersListInput {
  private paginationToken: string | undefined;

  public constructor({ requestContext, queryStringParameters }: APIGatewayProxyEventV2) {
    super(requestContext.authorizer);
    this.paginationToken = queryStringParameters?.pagination_token;
  }

  public getPaginationToken() {
    return this.paginationToken;
  }
}

export class GetUserInfoInput extends EventV2CognitoAuthorizer implements IGetUserInfoInput {
  // eslint-disable-next-line no-useless-constructor
  public constructor(
    authorizer: APIGatewayProxyEventV2Authorizer | undefined,
  ) {
    super(authorizer);
  }
}

export class PutZacInfoInput extends EventV2CognitoAuthorizer implements IPutZacInfoInput {
  data: ZacInfo;

  public constructor(
    authorizer: APIGatewayProxyEventV2Authorizer | undefined,
    requestBody: string | undefined,
  ) {
    super(authorizer);
    if (requestBody == null) throw new errors.ValidationError('body is required');
    const body = JSON.parse(requestBody);
    const data = validation.check(zZacInfo, camelcaseKeys(body));
    this.data = data;
  }

  public getZacInfo() {
    return this.data;
  }
}

export class PutObcInfoInput extends EventV2CognitoAuthorizer implements IPutObcInfoInput {
  data: ObcInfo;

  public constructor(
    authorizer: APIGatewayProxyEventV2Authorizer | undefined,
    requestBody: string | undefined,
  ) {
    super(authorizer);
    if (requestBody == null) throw new errors.ValidationError('body is required');
    const body = JSON.parse(requestBody);
    const data = validation.check(zObcInfo, camelcaseKeys(body));
    this.data = data;
  }

  public getObcInfo() {
    return this.data;
  }
}
