import { Request, Response, NextFunction } from 'express-serve-static-core';

function errorHandler(error: any, _request: Request, response: Response, _next: NextFunction) {
  const status = error.statusCode || 500;
  console.log(error);
  const {
    code = 'internal error',
    message = 'server_error'
  } = JSON.parse(error.body);

  response
    .status(status)
    .send({
      code,
      message,
    });
}

export default errorHandler;
