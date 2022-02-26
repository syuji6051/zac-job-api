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

  async usersList(paginationToken: string | undefined): Promise<ListUsersResponse> {
    return this.cognito.listUsers({
      UserPoolId: this.userPoolId,
      PaginationToken: paginationToken,
    }).promise();
  }
}
