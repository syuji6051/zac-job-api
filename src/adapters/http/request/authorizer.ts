import { APIGatewayProxyEventV2Authorizer, APIGatewayProxyWithCognitoAuthorizer } from '@/src/entities/authorizer';
import { errors } from '@syuji6051/zac-job-library';

export class EventV2Authorizer {
  context?: APIGatewayProxyEventV2Authorizer

  userName: string

  constructor(
    context?: APIGatewayProxyEventV2Authorizer | null,
  ) {
    if (context == null) {
      throw new errors.ValidationError('APIGatewayProxyEventV2 Authorizer is require');
    }
    const { jwt } = context;
    const userName = jwt.claims.username ?? jwt.claims['cognito:username'];
    if (typeof userName !== 'string') {
      throw new errors.ValidationError('APIGatewayProxyEventV2 Authorizer username type not string');
    }
    this.userName = userName;
  }

  getUserName() {
    return this.userName;
  }
}

export class EventV2CognitoAuthorizer {
  private context?: APIGatewayProxyEventV2Authorizer

  private userName: string

  constructor(
    context?: APIGatewayProxyEventV2Authorizer | null,
  ) {
    if (context == null) {
      throw new errors.ValidationError('APIGatewayProxyEventV2 Authorizer is require');
    }
    const { jwt } = context;
    const userName = jwt.claims['cognito:username'];
    if (typeof userName !== 'string') {
      throw new errors.ValidationError('APIGatewayProxyEventV2 Authorizer username type not string');
    }
    this.userName = userName;
  }

  public getUserName() {
    return this.userName;
  }
}

export class CognitoAuthorizer {
  context: APIGatewayProxyWithCognitoAuthorizer

  userName: string

  constructor(
    context?: APIGatewayProxyWithCognitoAuthorizer,
  ) {
    if (context === undefined) {
      throw new errors.ValidationError('CognitoAuthorizer is require');
    }
    const { claims } = context;
    const userName = claims['cognito:username'];
    this.userName = userName;
  }

  getUserName() {
    return this.userName;
  }
}
