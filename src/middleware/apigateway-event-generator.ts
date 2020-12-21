import { Request } from 'express-serve-static-core';
import {
  APIGatewayEventRequestContextWithAuthorizer,
  APIGatewayProxyCognitoAuthorizer,
  APIGatewayProxyWithCognitoAuthorizerEvent,
} from 'aws-lambda';

export default function apiGatewayEventGenerator(req: Request) {
  const requestContext = <any>{
    resourceId: req.headers['x-express-resource-id'],
    apiId: req.headers['x-amzn-api-id'],
    authorizer: {
      claims: {
        'cognito:username': req.headers['x-identity-user'],
      },
    },
    identity: {
      user: req.headers['x-identity-user'],
    },
  } as APIGatewayEventRequestContextWithAuthorizer<APIGatewayProxyCognitoAuthorizer>;
  return {
    pathParameters: req.params,
    queryStringParameters: req.query,
    body: JSON.stringify(req.body),
    requestContext,
  } as APIGatewayProxyWithCognitoAuthorizerEvent;
}
