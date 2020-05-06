import { injectable } from 'inversify';
import { UserType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

import { Users as IUsers } from '../../usecases/stores/Users';
import { Users as UsersTable } from '../../cognito/Users';
import { UserInfo as UserInfoTable } from '../../database/User';
import { User, Users as EntitiesUsers, UserInfo } from '../../entities/Users';

@injectable()
export class Users implements IUsers {
  private cognito: UsersTable;
  private user: UserInfoTable;
  constructor() {
    this.cognito = new UsersTable();
    this.user = new UserInfoTable();
  }

  public async create(email: string): Promise<User> {
    const user = await this.cognito.create(email);
    return user ? this.recordToEntity(user) : {};
  }

  public async get(userId: string): Promise<UserInfo> {
    return this.user.get(userId);
  }

  public async list(paramPaginationToken: string): Promise<EntitiesUsers> {
    const {
      Users: users, PaginationToken: paginationToken
    } = await this.cognito.list(paramPaginationToken);
    return {
      users: users ? users.map(user => this.recordToEntity(user)) : [],
      paginationToken: paginationToken!,
    };
  }

  private recordToEntity(user: UserType): User {
    return {
      userName: user.Username,
      enabled: user.Enabled,
      userStatus: user.UserStatus,
      attributes: user.Attributes
    };
  };
}