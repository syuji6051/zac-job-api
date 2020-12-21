/* eslint-disable no-console */
import { Request, Response, NextFunction } from 'express';
import {
  APIGatewayProxyResult, APIGatewayProxyWithCognitoAuthorizerEvent,
} from 'aws-lambda';
import apiGatewayEventGenerator from '@/middleware/apigateway-event-generator';

const lambdaDriver = (
  // eslint-disable-next-line no-unused-vars
  controller: (event: APIGatewayProxyWithCognitoAuthorizerEvent) => Promise<any>,
) => async (req: Request, res: Response, next: NextFunction) => {
  const event = apiGatewayEventGenerator(req);
  return controller(event)
    .then((result: APIGatewayProxyResult) => res.status(result.statusCode || 200)
      .send(JSON.parse(result.body)))
    .catch((err) => {
      console.log(err);
      next(err);
    });
};

export default lambdaDriver;
