import { inject, injectable } from 'inversify';
import { secrets } from '@syuji6051/zac-job-interface';

import { Users as IUsers } from '@/src/usecases/stores/users';
import UsersTable from '@/src/cognito/users';
import { GetUsersListOutput, UserInfo } from '@/src/entities/users';
import { TYPES } from '@/src/providers/container';
import UserAttributes from '@/src/database/user-attributes';
import { UserAttributesRecord } from '@/src/entities/dynamodb/user-attributes';

@injectable()
export default class Users implements IUsers {
  private cognito: UsersTable;

  private userAttributes: UserAttributes;

  constructor(
    @inject(TYPES.ASM_VALUES) private secret: secrets.SecretsValues,
  ) {
    this.cognito = new UsersTable(secret.COGNITO_USER_POOL);
    this.userAttributes = new UserAttributes();
  }

  public async create(email: string): Promise<void> {
    await this.cognito.create(email);
  }

  public async getUsersList(paramPaginationToken: string | undefined): Promise<GetUsersListOutput> {
    const {
      Users: users, PaginationToken: paginationToken,
    } = await this.cognito.usersList(paramPaginationToken);
    return {
      users: users == null ? [] : users.map((user) => ({
        userName: user.Username,
        enabled: user.Enabled,
        userStatus: user.UserStatus,
        isAdmin: user.Attributes?.find((attr) => attr.Name === 'is_admin')?.Value === 'true',
      })),
      paginationToken,
    };
  }

  public async getUserInfo(userId: string): Promise<UserInfo> {
    const user = await this.userAttributes.get(userId);
    return user;
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
