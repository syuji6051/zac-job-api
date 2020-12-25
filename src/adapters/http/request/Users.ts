import {
  APIGatewayEventRequestContextWithAuthorizer, APIGatewayProxyCognitoAuthorizer,
} from 'aws-lambda';

import {
  UserCreateInput as IUserCreateInput,
  UserListInput as IUserListInput,
  PutZacLoginInput as IPutZacLoginInput,
  PutObcLoginInput as IPutObcLoginInput,
  ZacWorkRegisterInput as IZacWorkRegisterInput,
} from '@/usecases/inputs/Users';
import { putZacLoginValidateFunc, zacWorkRegisterFunc, putObcLoginValidateFunc } from '@/validations/users';
import { ValidationError } from '@/lib/errors';
import { ZacUserLoginRequestBody, ObcUserLoginRequestBody, ZacWorkRegisterRequestBody } from '@/entities/Users';
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

export class PutObcLoginInput extends Authorizer implements IPutObcLoginInput {
  body: ObcUserLoginRequestBody;

  public constructor(
    context: APIGatewayEventRequestContextWithAuthorizer<APIGatewayProxyCognitoAuthorizer>,
    requestBody: string | null,
  ) {
    super(context);
    if (requestBody === null) throw new Error();
    const body = JSON.parse(requestBody);
    const validateFunc = putObcLoginValidateFunc;
    const isValid = validateFunc(body);
    if (!isValid && validateFunc.errors) {
      const errorMessage = validateFunc.errors
        ? `invalid request ${validateFunc.errors.map((e) => e.message).join()}`
        : 'invalid request';
      throw new ValidationError(errorMessage);
    }
    this.body = body as ObcUserLoginRequestBody;
  }

  public getUserName() {
    return super.getUserName();
  }

  public getObcUserId() {
    return this.body.obcUserId;
  }

  public getObcPassword() {
    return this.body.obcPassword;
  }
}

export class ZacWorkRegisterInput extends Authorizer implements IZacWorkRegisterInput {
  body: ZacWorkRegisterRequestBody

  public constructor(
    context: APIGatewayEventRequestContextWithAuthorizer<APIGatewayProxyCognitoAuthorizer>,
    requestBody: string | null,
  ) {
    super(context);
    if (requestBody === null) throw new Error();
    const body = JSON.parse(requestBody);
    const validateFunc = zacWorkRegisterFunc;
    const isValid = validateFunc(body);
    if (!isValid && validateFunc.errors) {
      const errorMessage = validateFunc.errors
        ? `invalid request ${validateFunc.errors.map((e) => e.message).join()}`
        : 'invalid request';
      throw new ValidationError(errorMessage);
    }
    this.body = body as ZacWorkRegisterRequestBody;
  }

  public getUserName() {
    return super.getUserName();
  }

  public getWorkDate() {
    return this.body.workDate;
  }

  public getWorkStartHour() {
    return this.body.workStartHour;
  }

  public getWorkStartMinute() {
    return this.body.workStartMinute;
  }

  public getWorkEndHour() {
    return this.body.workEndHour;
  }

  public getWorkEndMinute() {
    return this.body.workEndMinute;
  }

  public getWorkBreakHour() {
    return this.body.workBreakHour;
  }

  public getWorkBreakMinute() {
    return this.body.workBreakMinute;
  }

  public getWorks() {
    return this.body.works;
  }
}
