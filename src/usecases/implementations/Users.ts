import { inject, injectable } from 'inversify';
import { APIGatewayProxyResult } from 'aws-lambda';

import {
  UserCreateInput, UserListInput, PutZacLoginInput, ZacWorkRegisterInput, PutObcLoginInput,
} from '@/usecases/inputs/Users';
import { Users as IUsers } from '@/usecases/Users';
import { Users as UserStore } from '@/usecases/stores/Users';
import { container, TYPES } from '@/providers/container';
import {
  UserCreateOutput, UserListOutput, PutZacLoginOutput, ZacWorkRegisterOutput, PutObcLoginOutput,
} from '@/usecases/outputs/Users';
import { encrypt } from '@/lib/crypto';
import { SecretsValues } from '@/entities/Environments';

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
    const {
      ENCRYPT_KEY,
      ENCRYPT_SALT_KEY,
    } = this.secrets;
    const password = input.getZacPassword();
    const encryptedData = encrypt(ENCRYPT_KEY, ENCRYPT_SALT_KEY, password);
    await this.store.putZacLogin(
      input.getUserName(),
      input.getZacUserId(),
      encryptedData,
    );
    return output.success();
  }

  public async putObcLogin(
    input: PutObcLoginInput,
    output: PutObcLoginOutput,
  ): Promise<APIGatewayProxyResult> {
    const {
      ENCRYPT_KEY,
      ENCRYPT_SALT_KEY,
    } = this.secrets;
    const password = input.getObcPassword();
    const encryptedData = encrypt(ENCRYPT_KEY, ENCRYPT_SALT_KEY, password);
    await this.store.putObcLogin(
      input.getUserName(),
      input.getObcUserId(),
      encryptedData,
    );
    return output.success();
  }

  public async ZacWorkRegister(
    input: ZacWorkRegisterInput,
    output: ZacWorkRegisterOutput,
  ): Promise<APIGatewayProxyResult> {
    await this.store.register({
      userId: input.getUserName(),
      workDate: input.getWorkDate(),
      workStartHour: input.getWorkStartHour(),
      workStartMinute: input.getWorkStartMinute(),
      workEndHour: input.getWorkEndHour(),
      workEndMinute: input.getWorkEndMinute(),
      workBreakHour: input.getWorkBreakHour(),
      workBreakMinute: input.getWorkBreakMinute(),
      works: input.getWorks(),
    });
    return output.success();
  }
}