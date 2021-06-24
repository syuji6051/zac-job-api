import { AttributeListType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

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

export interface User {
  userName?: string;
  enabled?: boolean;
  userStatus?: string;
  attributes?: AttributeListType;
}

export interface UserInfo {
  userId: string;
  obcUserId: string;
  obcPassword: string;
}

export interface ZacUserLogin {
  userId: string;
  zacUserId: string;
  zacPassword: string;
}

export interface ZacUserLoginRequestBody {
  zacTenantId: string
  zacUserId: string
  zacPassword: string
}

export interface ObcUserLoginRequestBody {
  obcTenantId: string
  obcUserId: string
  obcPassword: string
}

export interface Attribute {
  tenantId: string
  userId: string
  password: string
}

export interface Users {
  paginationToken: string;
  users: User[];
}
