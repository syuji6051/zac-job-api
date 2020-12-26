import { ValidationError } from '@/lib/errors';
import { invalidErrorResponse, serverErrorResponse } from '@/views/response';

// eslint-disable-next-line import/prefer-default-export
export const lambdaErrorHandler = (err: any) => {
  switch (err.constructor) {
    case ValidationError:
      return invalidErrorResponse(err);
    default:
      return serverErrorResponse(err);
  }
};