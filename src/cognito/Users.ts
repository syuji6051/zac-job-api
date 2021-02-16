import { Attribute } from '@/entities/Users';
import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { ListUsersResponse, UserType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

export default class Users {
  cognito: CognitoIdentityServiceProvider;

  userPoolId: string;

  constructor(
    userPoolId: string,
  ) {
    this.cognito = new CognitoIdentityServiceProvider({
      region: process.env.REGION,
    });
    this.userPoolId = userPoolId;
  }

  async create(email: string): Promise<UserType | undefined> {
    return this.cognito.adminCreateUser({
      Username: email,
      UserPoolId: this.userPoolId,
      UserAttributes: [{
        Name: 'email',
        Value: email,
      }],
      DesiredDeliveryMediums: ['EMAIL'],
    }).promise()
      .then((res) => res.User);
  }

  async list(paginationToken: string): Promise<ListUsersResponse> {
    return this.cognito.listUsers({
      UserPoolId: this.userPoolId,
      PaginationToken: paginationToken,
    }).promise();
  }

  async putZacLogin(userId: string, userAttribute: Attribute) {
    await this.cognito.adminUpdateUserAttributes({
      UserPoolId: this.userPoolId,
      Username: userId,
      UserAttributes: [{
        Name: 'custom:zacTenantId',
        Value: userAttribute.tenantId,
      }, {
        Name: 'custom:zacLoginId',
        Value: userAttribute.userId,
      }, {
        Name: 'custom:zacPassword',
        Value: userAttribute.password,
      }],
    }).promise();
  }

  async putObcLogin(userId: string, userAttribute: Attribute) {
    await this.cognito.adminUpdateUserAttributes({
      UserPoolId: this.userPoolId,
      Username: userId,
      UserAttributes: [{
        Name: 'custom:obcTenantId',
        Value: userAttribute.tenantId,
      }, {
        Name: 'custom:obcLoginId',
        Value: userAttribute.userId,
      }, {
        Name: 'custom:obcPassword',
        Value: userAttribute.password,
      }],
    }).promise();
  }
}
