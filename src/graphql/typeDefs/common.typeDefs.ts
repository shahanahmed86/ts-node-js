import { gql } from 'apollo-server-express';

const commonSchema = gql`
  extend type Query {
    genderOptions: [GenderType!]!
  }

  extend type Subscription {
    session(token: String!): Message!
  }
`;

export default commonSchema;
