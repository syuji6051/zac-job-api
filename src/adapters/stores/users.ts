import { inject, injectable } from 'inversify';
import { UserType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

import { Users as IUsers } from '@/src/usecases/stores/users';
import UsersTable from '@/src/cognito/users';
import Puppeteer from '@/src/puppeteer/zac';
import {
  User, Users as EntitiesUsers, Attribute,
} from '@/src/entities/users';
import { TYPES } from '@/src/providers/container';
import { SecretsValues } from '@/src/entities/environments';

@injectable()
export default class Users implements IUsers {
  private cognito: UsersTable;

  private puppeteer: Puppeteer;

  constructor(
    @inject(TYPES.ASM_VALUES) private secrets: SecretsValues,
  ) {
    this.cognito = new UsersTable(secrets.COGNITO_USER_POOL);
    this.puppeteer = new Puppeteer();
  }

  public async create(email: string): Promise<User> {
    const user = await this.cognito.create(email);
    return user ? this.recordToEntity(user) : {};
  }

  public async list(paramPaginationToken: string): Promise<EntitiesUsers> {
    const {
      Users: users, PaginationToken: paginationToken,
    } = await this.cognito.list(paramPaginationToken);
    return {
      users: users ? users.map((user) => this.recordToEntity(user)) : [],
      paginationToken: paginationToken!,
    };
  }

  public async putZacLogin(userId: string, userAttribute: Attribute): Promise<void> {
    await this.cognito.putZacLogin(userId, userAttribute);
  }

  public async putObcLogin(userId: string, userAttribute: Attribute): Promise<void> {
    await this.cognito.putObcLogin(userId, userAttribute);
  }

  private recordToEntity(user: UserType): User {
    return {
      userName: user.Username,
      enabled: user.Enabled,
      userStatus: user.UserStatus,
      attributes: user.Attributes,
    };
  }
}
