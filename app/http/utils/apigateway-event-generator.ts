import { Request } from 'express-serve-static-core';
import { APIGatewayEvent } from 'aws-lambda';

export default function apiGatewayEventGenerator(req: Request) {
  /*
    const requestContent = {
      resourceId: req.headers['x-express-resource-id'],
      apiId: req.headers['x-amzn-api-id'],
  
    }
  */
  console.log(req.body);
  return {
    body: req.body,
  } as APIGatewayEvent;
};
