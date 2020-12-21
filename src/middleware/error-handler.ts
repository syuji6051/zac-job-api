import { NextFunction, Request, Response } from 'express';

function errorHandler() {
  return (error: any, _request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    if (error) {
      response
        .status(status)
        .send({
          code: 'server_error',
          message: (typeof error === 'object') ? JSON.parse(error) : error,
        });
    } else {
      next(error);
    }
  };
}

export default errorHandler;
