export const UserInfoTable = 'UserInfo';
export const UserWorkTable = 'UserWork';

export const definition = `
type ${UserInfoTable} {
  userId: String
  obcUserId: String
  obcPassword: String
}
type ${UserWorkTable} {
  userId: String
  day: Int
  clockIn: String
  clockOut: String
  goOut1: String
  returned1: String
  goOut2: String
  returned2: String
  goOut3: String
  returned3: String
}
type Query {
  getObcAuthentication: ${UserInfoTable}
  getUserWork(start: Int!, end: Int!): ${UserWorkTable}
}
type Mutation {
  setObcAuthentication(obcUserId: String!, obcPassword: String!): ${UserInfoTable}
}
type Schema {
  query: Query
  mutation: Mutation
}
`;