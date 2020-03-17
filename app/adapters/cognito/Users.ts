import { injectable } from 'inversify';
import { UserType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

import { Users as IUsers } from '../../usecases/stores/Users';
import { Users as UsersTable } from '../../cognito/Users';
import { User, Users as EntitiesUsers } from '../../entities/Users';

@injectable()
export class Users implements IUsers {
  private cognito: UsersTable;
  constructor() {
    this.cognito = new UsersTable();
  }

  public async create(email: string): Promise<User> {
    const user = await this.cognito.create(email);
    return user ? this.recordToEntity(user) : {};
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