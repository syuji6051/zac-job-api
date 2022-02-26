export interface APIGatewayProxyEventV2Authorizer {
  jwt: {
      claims: { [name: string]: string | number | boolean | string[] };
      scopes: string[];
  };
}

export interface APIGatewayProxyWithCognitoAuthorizer {
  claims: {
    [name: string]: string;
  };
}
