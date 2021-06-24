import { errors, validation } from '@syuji6051/zac-job-library';

import {
  UserCreateInput as IUserCreateInput,
  UserListInput as IUserListInput,
  PutZacLoginInput as IPutZacLoginInput,
  PutObcLoginInput as IPutObcLoginInput,
} from '@/src/usecases/inputs/users';
import { putObcLoginValidateFunc, putZacLoginValidateFunc } from '@/src/validations/users';
import {
  ZacUserLoginRequestBody, ObcUserLoginRequestBody,
  APIGatewayProxyWithCognitoAuthorizer,
} from '@/src/entities/users';
import { CognitoAuthorizer } from '@/src/adapters/http/request/authorizer';

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

export class PutZacLoginInput extends CognitoAuthorizer implements IPutZacLoginInput {
  body: ZacUserLoginRequestBody;

  public constructor(
    requestBody: string | null,
    context?: APIGatewayProxyWithCognitoAuthorizer,
  ) {
    super(context);
    if (requestBody === null) throw new errors.ValidationError('body is required');
    const body = JSON.parse(requestBody);
    validation.check(putZacLoginValidateFunc, body);
    this.body = body as ZacUserLoginRequestBody;
  }

  public getUserName() {
    return super.getUserName();
  }

  public getZacTenantId() {
    return this.body.zacTenantId;
  }

  public getZacUserId() {
    return this.body.zacUserId;
  }

  public getZacPassword() {
    return this.body.zacPassword;
  }
}

export class PutObcLoginInput extends CognitoAuthorizer implements IPutObcLoginInput {
  body: ObcUserLoginRequestBody;

  public constructor(
    requestBody: string | null,
    context?: APIGatewayProxyWithCognitoAuthorizer,
  ) {
    super(context);
    if (requestBody === null) throw new errors.ValidationError('body is required');
    const body = JSON.parse(requestBody);
    validation.check(putObcLoginValidateFunc, body);
    this.body = body as ObcUserLoginRequestBody;
  }

  public getUserName() {
    return super.getUserName();
  }

  public getObcTenantId() {
    return this.body.obcTenantId;
  }

  public getObcUserId() {
    return this.body.obcUserId;
  }

  public getObcPassword() {
    return this.body.obcPassword;
  }
}
