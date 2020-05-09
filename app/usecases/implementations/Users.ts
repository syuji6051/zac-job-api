import { injectable } from "inversify";
import { UserCreateInput, UserListInput } from "app/usecases/inputs/Users";
import { Users as IUsers } from 'app/usecases/Users';
import { Users as UserStore } from 'app/usecases/stores/Users';
import { container, TYPES } from "../../providers/container";
import { UserCreateOutput, UserListOutput } from "app/usecases/outputs/Users";
import { APIGatewayProxyResult } from "aws-lambda";

@injectable()
export class Users implements IUsers {
  private store: UserStore;

  constructor() {
    this.store = container.get<UserStore>(TYPES.STORE_USERS);
  }

  public async create(
    input: UserCreateInput,
    output: UserCreateOutput
  ): Promise<APIGatewayProxyResult> {
    try {
      const user = await this.store.create(
        input.getUserName(), input.getPassword());
      return output.success(user);
    } catch (e) {
      return output.error400(e);
    }
  }

  public async list(
    input: UserListInput,
    output: UserListOutput,
  ): Promise<APIGatewayProxyResult> {
    const users = await this.store.list(
      input.getPaginationToken());
    return output.success(users);
  }
}