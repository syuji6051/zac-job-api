import { Request } from 'express-serve-static-core';
import { APIGatewayEvent, APIGatewayEventRequestContext } from 'aws-lambda';

export default function apiGatewayEventGenerator(req: Request) {
  const requestContext = <any>{
    resourceId: req.headers['x-express-resource-id'],
    apiId: req.headers['x-amzn-api-id'],
    authorizer: {
      'claims': {
        'cognito:username': req.headers['x-identity-user']
      }
    },
    identity: {
      user: req.headers['x-identity-user'],
    }
  } as APIGatewayEventRequestContext;
  return {
    pathParameters: req.params,
    queryStringParameters: req.query,
    body: JSON.stringify(req.body),
    requestContext,
  } as APIGatewayEvent;
};
