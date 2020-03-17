import { Request, Response, NextFunction } from 'express-serve-static-core';
import { APIGatewayEvent, Callback, Context } from "aws-lambda";
import apiGatewayEventGenerator from '../utils/apigateway-event-generator';
const lambdaDriver =
  (controller: (event: APIGatewayEvent, content: Context, cb: Callback) => Promise<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const event = apiGatewayEventGenerator(req);
      const context = {} as Context;
      return controller(event, context, result => res.status(200).send(result))
        .catch((err) => {
          next(err);
        });
    };

export default lambdaDriver;
