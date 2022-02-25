/* eslint-disable camelcase */
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

export interface GetUserInfoRequest {
  user_id: string
}

export interface UserInfo {
  userId: string;
  obcTenantId?: string | null;
  obcUserId?: string | null;
  zacTenantId?: string | null;
  zacUserId?: string | null;
  slackUserName?: string | null;
}

export interface ZacUserLogin {
  userId: string;
  zacUserId: string;
  zacPassword: string;
}

export interface ZacUserRequest {
  zac_tenant_id: string
  zac_user_id: string
  zac_password: string
}

export interface ZacInfo {
  zacTenantId: string
  zacUserId: string
  zacPassword: string
}

export interface ObcInfoRequest {
  obc_tenant_id: string
  obc_user_id: string
  obc_password: string
}

export interface ObcInfo {
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
