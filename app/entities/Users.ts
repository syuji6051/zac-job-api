import { AttributeListType } from "aws-sdk/clients/cognitoidentityserviceprovider";

export interface User {
  userName?: string;
  enabled?: boolean;
  userStatus?: string;
  attributes?: AttributeListType;
};

export interface Users {
  paginationToken: string;
  users: User[];
};
