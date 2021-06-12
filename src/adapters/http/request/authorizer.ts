import { APIGatewayEventRequestContextWithAuthorizer, APIGatewayProxyCognitoAuthorizer } from 'aws-lambda';

export default class Authorizer {
  context: APIGatewayEventRequestContextWithAuthorizer<APIGatewayProxyCognitoAuthorizer>

  userName: string

  constructor(
    context: APIGatewayEventRequestContextWithAuthorizer<APIGatewayProxyCognitoAuthorizer>,
  ) {
    this.context = context;
    const { authorizer } = context;
    this.userName = authorizer.claims['cognito:username'];
  }

  getUserName() {
    return this.userName;
  }
}
