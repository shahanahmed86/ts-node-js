import { gql } from 'apollo-server-express';

const commonSchema = gql`
  extend type Query {
    genderOptions: [GenderType!]!
  }
`;

export default commonSchema;
