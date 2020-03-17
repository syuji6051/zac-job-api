import { Request, Response, NextFunction } from 'express-serve-static-core';

function errorHandler(error: any, _request: Request, response: Response, _next: NextFunction) {
  const status = error.status || 500;
  const message = error.message || 'internal error';
  const code = error.code || 'server_error';

  console.log(error.message);
  console.log(error.stack);

  response
    .status(status)
    .send({
      message, code,
    });
}

export default errorHandler;
