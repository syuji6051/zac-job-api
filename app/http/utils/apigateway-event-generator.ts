import { Request } from 'express-serve-static-core';
import { APIGatewayEvent } from 'aws-lambda';

export default function apiGatewayEventGenerator(req: Request) {
  /*
    const requestContent = {
      resourceId: req.headers['x-express-resource-id'],
      apiId: req.headers['x-amzn-api-id'],
  
    }
  */
  return {
    pathParameters: req.params,
    queryStringParameters: req.query,
    body: JSON.stringify(req.body),
  } as APIGatewayEvent;
};
