import { User, Users as EntitiesUsers } from "../../entities/Users";

export interface Users {
  create(email: string, password: string): Promise<User>;
  list(paramPaginationToken: string): Promise<EntitiesUsers>
};
