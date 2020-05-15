export const UserInfoTable = 'UserInfo';
export const UserWorkTable = 'UserWork';

export const definition = `
type ${UserInfoTable} {
  userId: String
  obcUserId: String
  obcPassword: String
}
type Query {
  getObcAuthentication: ${UserInfoTable}
}
type Mutation {
  setObcAuthentication(obcUserId: String!, obcPassword: String!): ${UserInfoTable}
}
type Schema {
  query: Query
  mutation: Mutation
}
`;