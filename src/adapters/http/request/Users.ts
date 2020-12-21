import {
  APIGatewayEventRequestContextWithAuthorizer, APIGatewayProxyCognitoAuthorizer,
} from 'aws-lambda';

import {
  UserCreateInput as IUserCreateInput,
  UserListInput as IUserListInput,
  PutZacLoginInput as IPutZacLoginInput,
} from '@/usecases/inputs/Users';
import { putZacLoginValidateFunc } from '@/validations/users';
import { ValidationError } from '@/lib/errors';
import { ZacUserLoginRequestBody } from '@/entities/Users';
import Authorizer from '@/adapters/http/request/Authorizer';

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

export class PutZacLoginInput extends Authorizer implements IPutZacLoginInput {
  body: ZacUserLoginRequestBody;

  public constructor(
    context: APIGatewayEventRequestContextWithAuthorizer<APIGatewayProxyCognitoAuthorizer>,
    requestBody: string | null,
  ) {
    super(context);
    if (requestBody === null) throw new Error();
    const body = JSON.parse(requestBody);
    const validateFunc = putZacLoginValidateFunc;
    const isValid = validateFunc(body);
    if (!isValid && validateFunc.errors) {
      const errorMessage = validateFunc.errors
        ? `invalid request ${validateFunc.errors.map((e) => e.message).join()}`
        : 'invalid request';
      throw new ValidationError(errorMessage);
    }
    this.body = body as ZacUserLoginRequestBody;
  }

  public getUserName() {
    return super.getUserName();
  }

  public getZacUserId() {
    return this.body.zacUserId;
  }

  public getZacPassword() {
    return this.body.zacPassword;
  }
}
