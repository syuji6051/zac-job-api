export interface UserCreateInput {
  getUserName(): string;
  getPassword(): string;
};

export interface UserListInput {
  getPaginationToken(): string;
};
