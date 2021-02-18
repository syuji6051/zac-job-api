import { inject, injectable } from 'inversify';
import { UserType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

import { Users as IUsers } from '@/usecases/stores/Users';
import UsersTable from '@/cognito/Users';
import { UserInfo as UserInfoTable } from '@/database/User';
import Puppeteer from '@/puppeteer/zac';
import {
  User, Users as EntitiesUsers, UserInfo, ZacWork, Attribute,
} from '@/entities/Users';
import { TYPES } from '@/providers/container';
import { SecretsValues } from '@/entities/Environments';

@injectable()
export default class Users implements IUsers {
  private cognito: UsersTable;

  private puppeteer: Puppeteer;

  private user: UserInfoTable;

  constructor(
    @inject(TYPES.ASM_VALUES) private secrets: SecretsValues,
  ) {
    this.cognito = new UsersTable(secrets.COGNITO_USER_POOL);
    this.puppeteer = new Puppeteer();
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

  public async register(props: ZacWork) {
    await this.puppeteer.register(props);
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
