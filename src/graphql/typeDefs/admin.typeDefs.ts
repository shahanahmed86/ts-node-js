import { gql } from 'apollo-server-express';

const adminSchema = gql`
  type Admin {
    id: String!
    username: String!
    deletedUsers: [User!]!
    signUps: [SignUp!]!
    createdAt: Date!
    updatedAt: Date!
  }

  type AuthAdmin {
    token: String!
    payload: Admin!
  }

  extend type Query {
    adminLoggedIn: Admin! @auth(shouldAdmin: true)
  }

	extend type Mutation {
    adminLogin(username: String!, password: String!): AuthAdmin! @guest(shouldAdmin: true)
    adminChangePassword(oldPassword: String!, password: String!): String! @auth(shouldAdmin: true)
	}
`;

export default adminSchema;
