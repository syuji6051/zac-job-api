import { AttributeListType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

export interface User {
  userName?: string;
  enabled?: boolean;
  userStatus?: string;
  attributes?: AttributeListType;
}

export interface UserInfo {
  userId: string;
  obcUserId?: string;
  obcPassword?: string;
}

export interface ZacUserLogin {
  userId: string;
  zacUserId: string;
  zacPassword: string;
}

export interface ZacUserLoginRequestBody {
  zacUserId: string;
  zacPassword: string
}

export interface Users {
  paginationToken: string;
  users: User[];
}
