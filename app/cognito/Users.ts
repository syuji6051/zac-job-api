import { CognitoIdentityServiceProvider } from 'aws-sdk';
import { ListUsersResponse, UserType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

export class Users {
  cognito: CognitoIdentityServiceProvider;
  userPoolId: string;
  constructor() {
    this.cognito = new CognitoIdentityServiceProvider({
      region: 'ap-northeast-1'
    });
    this.userPoolId = process.env.COGNITO_USER_POOL!;
  }

  async create(email: string): Promise<UserType | undefined> {
    return this.cognito.adminCreateUser({
      Username: email,
      UserPoolId: this.userPoolId,
      UserAttributes: [{
        Name: 'email',
        Value: email
      }],
      DesiredDeliveryMediums: ['EMAIL'],
    }).promise()
      .then(res => res.User);
  }

  async list(paginationToken: string): Promise<ListUsersResponse> {
    return this.cognito.listUsers({
      UserPoolId: this.userPoolId,
      PaginationToken: paginationToken,
    }).promise();
  }
}