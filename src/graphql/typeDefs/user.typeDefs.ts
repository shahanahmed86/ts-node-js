import { gql } from 'apollo-server-express';

const userSchema = gql`
  type User {
    id: String!
    signUps: [SignUp!]!
    defaultLogin: LoginType!
    createdAt: Date!
    updatedAt: Date!
  }

  type SignUp {
    id: String!
    username: String
    password: String
    avatar: String
    fullName: String
    email: String
    cell: String
    gender: GenderType
    user: User!
    userId: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type AuthSignUp {
    token: String!
    payload: SignUp!
  }

  extend type Query {
    userLoggedIn: SignUp! @auth(shouldUser: true)
  }

	extend type Mutation {
    userLogin(username: String!, password: String!): AuthSignUp! @guest(shouldUser: true)
    userChangePassword(oldPassword: String!, password: String!): String! @auth(shouldUser: true)
    userSignUp(inputSignUp: InputSignUp!): String! @auth(shouldUser: true)
	}

  input InputSignUp {
    username: String!
    password: String!
    avatar: String
    fullName: String
    email: String
    cell: String
    gender: GenderType
  }
`;

export default userSchema;
