import { inject, injectable } from 'inversify';
import { UserType } from 'aws-sdk/clients/cognitoidentityserviceprovider';

import { Users as IUsers } from '@/src/usecases/stores/users';
import UsersTable from '@/src/cognito/users';
import Puppeteer from '@/src/puppeteer/zac';
import { User, Users as EntitiesUsers, UserInfo } from '@/src/entities/users';
import { TYPES } from '@/src/providers/container';
import { SecretsValues } from '@/src/entities/environments';
import UserAttributes from '@/src/database/user-attributes';
import { UserAttributesRecord } from '@/src/entities/dynamodb/user-attributes';

@injectable()
export default class Users implements IUsers {
  private cognito: UsersTable;

  private puppeteer: Puppeteer;

  private userAttributes: UserAttributes;

  constructor(
    @inject(TYPES.ASM_VALUES) private secrets: SecretsValues,
  ) {
    this.cognito = new UsersTable(secrets.COGNITO_USER_POOL);
    this.puppeteer = new Puppeteer();
    this.userAttributes = new UserAttributes();
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

  public async getUserInfo(userId: string): Promise<UserInfo> {
    const {
      obcTenantId, obcUserId, zacTenantId, zacUserId,
    } = await this.userAttributes.get(userId);
    return {
      userId, obcTenantId, obcUserId, zacTenantId, zacUserId,
    };
  }

  private recordToEntity(user: UserType): User {
    return {
      userName: user.Username,
      enabled: user.Enabled,
      userStatus: user.UserStatus,
      attributes: user.Attributes,
    };
  }

  public async setAttribute(userAttributes: UserAttributesRecord) {
    const user = await this.userAttributes.get(userAttributes.userId);
    await this.userAttributes.set({
      ...user,
      ...userAttributes,
    });
  }

  public async getUserFromSlackId(slackId: string) {
    const users = await this.userAttributes.scan();
    return users.find((user) => user.slackUserId === slackId);
  }
}
