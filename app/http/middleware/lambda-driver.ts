import { Request, Response, NextFunction } from 'express-serve-static-core';
import { APIGatewayEvent, Context, APIGatewayProxyResult, Callback } from "aws-lambda";
import apiGatewayEventGenerator from '../utils/apigateway-event-generator';
const lambdaDriver =
  (controller: (event: APIGatewayEvent, content: Context, _cb: Callback) => Promise<any>) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const event = apiGatewayEventGenerator(req);
      const context = {} as Context;
      const callback = (() => null) as Callback;
      return controller(event, context, callback)
        .then((result: APIGatewayProxyResult) =>
          res.status(200).send(JSON.parse(result.body)))
        .catch(e => next(e));
    };

export default lambdaDriver;
