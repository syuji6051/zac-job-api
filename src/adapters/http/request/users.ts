import { errors, validation } from '@syuji6051/zac-job-library';

import {
  UserCreateInput as IUserCreateInput,
  UserListInput as IUserListInput,
  GetUserInfoInput as IGetUserInfoInput,
  PutZacInfoInput as IPutZacInfoInput,
  PutObcInfoInput as IPutObcInfoInput,
} from '@/src/usecases/inputs/users';
import { putObcLoginValidateFunc, putZacInfoValidateFunc } from '@/src/validations/users';
import {
  APIGatewayProxyEventV2Authorizer,
  ZacInfo,
  ObcInfo,
} from '@/src/entities/users';
import { EventV2CognitoAuthorizer } from '@/src/adapters/http/request/authorizer';
import camelcaseKeys from 'camelcase-keys';

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

export class UserListInput extends UserInput implements IUserListInput {
  private paginationToken: string;

  public constructor(
    _headers: { [name: string]: string },
    query: { [field: string]: string },
  ) {
    super();
    this.paginationToken = query.paginationToken;
  }

  public getPaginationToken(): string {
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
    validation.check(putZacInfoValidateFunc, body);
    this.data = camelcaseKeys(body);
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
    validation.check(putObcLoginValidateFunc, body);
    this.data = camelcaseKeys(body);
  }

  public getObcInfo() {
    return this.data;
  }
}
