import { APIGatewayProxyResult } from "aws-lambda";

export function success(body: any): APIGatewayProxyResult {
  return {
    statusCode: 200,
    body: JSON.stringify(body || {}),
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  }
}

export function invalidError(error: any): APIGatewayProxyResult {
  const { code, message } = error;
  return {
    statusCode: 400,
    body: JSON.stringify({
      code, message
    }),
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  };
}