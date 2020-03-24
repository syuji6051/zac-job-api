import { Callback } from "aws-lambda";

export function success(cb: Callback, body: string): void {
  cb(null, {
    statusCode: 200,
    body,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  });
}

export function invalidError(cb: Callback, error: any): void {
  const { code, message } = error;
  cb(null, {
    statusCode: 400,
    body: JSON.stringify({
      code, message
    }),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
}