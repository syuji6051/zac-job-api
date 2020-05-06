export const tableName = 'UserInfo';

export const definition = `
type ${tableName} {
  userId: String
  obcUserId: String
  obcPassword: String
}
type Query {
  getObcAuthentication: ${tableName}
}
type Mutation {
  setObcAuthentication(obcUserId: String!, obcPassword: String!): ${tableName}
}
type Schema {
  query: Query
  mutation: Mutation
}
`;