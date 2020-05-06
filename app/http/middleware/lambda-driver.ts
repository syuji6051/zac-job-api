import { Request, Response, NextFunction } from 'express-serve-static-core';
import { APIGatewayEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import apiGatewayEventGenerator from '../utils/apigateway-event-generator';
const lambdaDriver =
  (controller: (event: APIGatewayEvent, content: Context) => Promise<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const event = apiGatewayEventGenerator(req);
      const context = {} as Context;
      return controller(event, context)
        .then((result: APIGatewayProxyResult) =>
          res.status(200).send(JSON.parse(result.body)))
        .catch(e => next(e));
    };

export default lambdaDriver;
