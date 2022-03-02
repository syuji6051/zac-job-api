import { inject, injectable } from 'inversify';
import { APIGatewayProxyResult } from 'aws-lambda';

import {
  UserCreateInput, GetUsersListInput, PutZacInfoInput, PutObcInfoInput, GetUserInfoInput,
} from '@/src/usecases/inputs/users';
import { Users as IUsers } from '@/src/usecases/users';
import { Users as UserStore } from '@/src/usecases/stores/users';
import { container, TYPES } from '@/src/providers/container';
import {
  UserCreateOutput, GetUsersListOutput, GetUserInfoOutput, PutZacInfoOutput, PutObcInfoOutput,
} from '@/src/usecases/outputs/users';
import { SecretsValues } from '@/src/entities/environments';
import { encrypt } from '@syuji6051/zac-job-library';

@injectable()
export default class Users implements IUsers {
  private store: UserStore;

  constructor(
    // eslint-disable-next-line no-unused-vars
    @inject(TYPES.ASM_VALUES) private secrets: SecretsValues,
  ) {
    this.store = container.get<UserStore>(TYPES.STORE_USERS);
    // this.secrets = container.get<SecretsValues>(TYPES.ASM_VALUES);
  }

  public async create(
    input: UserCreateInput, output: UserCreateOutput,
  ): Promise<APIGatewayProxyResult> {
    await this.store.create(
      input.getUserName(), input.getPassword(),
    );
    return output.success();
  }

  public async getUsersList(
    input: GetUsersListInput, output: GetUsersListOutput,
  ): Promise<APIGatewayProxyResult> {
    const users = await this.store.getUsersList(
      input.getPaginationToken(),
    );
    return output.success(users);
  }

  public async getUserInfo(
    input: GetUserInfoInput, output: GetUserInfoOutput,
  ): Promise<APIGatewayProxyResult> {
    const userId = input.getUserName();
    const userInfo = await this.store.getUserInfo(userId);
    return output.success(userInfo);
  }

  public async putZacInfo(
    input: PutZacInfoInput, output: PutZacInfoOutput,
  ): Promise<APIGatewayProxyResult> {
    const { zacUserId, zacPassword, zacTenantId } = input.getZacInfo();
    const { ENCRYPT_KEY, ENCRYPT_SALT_KEY } = this.secrets;
    const encryptPassword = encrypt(ENCRYPT_KEY, ENCRYPT_SALT_KEY, zacPassword);

    await this.store.setAttribute({
      zacUserId,
      zacPassword: encryptPassword,
      zacTenantId,
      userId: input.getUserName(),
    });
    return output.success();
  }

  public async putObcInfo(
    input: PutObcInfoInput, output: PutObcInfoOutput,
  ): Promise<APIGatewayProxyResult> {
    const { obcUserId, obcPassword, obcTenantId } = input.getObcInfo();
    const { ENCRYPT_KEY, ENCRYPT_SALT_KEY } = this.secrets;
    const encryptPassword = encrypt(ENCRYPT_KEY, ENCRYPT_SALT_KEY, obcPassword);

    await this.store.setAttribute({
      obcUserId,
      obcPassword: encryptPassword,
      obcTenantId,
      userId: input.getUserName(),
    });

    return output.success();
  }
}
