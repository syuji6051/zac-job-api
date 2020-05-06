import { Request } from 'express-serve-static-core';
import { APIGatewayEvent, APIGatewayEventRequestContext } from 'aws-lambda';

export default function apiGatewayEventGenerator(req: Request) {
  const requestContext = {
    resourceId: req.headers['x-express-resource-id'],
    apiId: req.headers['x-amzn-api-id'],
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
