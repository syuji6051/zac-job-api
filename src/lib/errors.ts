// eslint-disable-next-line import/prefer-default-export
export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

export class ValidationError extends CustomError {
  code: string

  status: number

  cause: Error

  constructor(message: string) {
    super(message);
    this.code = 'invalid_request';
    this.status = 400;
  }
}
