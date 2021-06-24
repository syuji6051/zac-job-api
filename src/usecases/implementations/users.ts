import { inject, injectable } from 'inversify';
import { APIGatewayProxyResult } from 'aws-lambda';

import {
  UserCreateInput, UserListInput, PutZacLoginInput, PutObcLoginInput,
} from '@/src/usecases/inputs/users';
import { Users as IUsers } from '@/src/usecases/users';
import { Users as UserStore } from '@/src/usecases/stores/users';
import { container, TYPES } from '@/src/providers/container';
import {
  UserCreateOutput, UserListOutput, PutZacLoginOutput, PutObcLoginOutput,
} from '@/src/usecases/outputs/users';
import { SecretsValues } from '@/src/entities/environments';
import { getUserAttribute } from '@/src/helper/user-attribute';

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
    input: UserCreateInput,
    output: UserCreateOutput,
  ): Promise<APIGatewayProxyResult> {
    const user = await this.store.create(
      input.getUserName(), input.getPassword(),
    );
    return output.success(user);
  }

  public async list(
    input: UserListInput,
    output: UserListOutput,
  ): Promise<APIGatewayProxyResult> {
    const users = await this.store.list(
      input.getPaginationToken(),
    );
    return output.success(users);
  }

  public async putZacLogin(
    input: PutZacLoginInput,
    output: PutZacLoginOutput,
  ): Promise<APIGatewayProxyResult> {
    await this.store.putZacLogin(
      input.getUserName(),
      getUserAttribute(this.secrets, {
        tenantId: input.getZacTenantId(),
        userId: input.getZacUserId(),
        password: input.getZacPassword(),
      }),
    );
    return output.success();
  }

  public async putObcLogin(
    input: PutObcLoginInput,
    output: PutObcLoginOutput,
  ): Promise<APIGatewayProxyResult> {
    await this.store.putObcLogin(
      input.getUserName(),
      getUserAttribute(this.secrets, {
        tenantId: input.getObcTenantId(),
        userId: input.getObcUserId(),
        password: input.getObcPassword(),
      }),
    );
    return output.success();
  }
}
