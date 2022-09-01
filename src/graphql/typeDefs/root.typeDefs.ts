import { gql } from 'apollo-server-express';

const rootSchema = gql`
	directive @auth(shouldAdmin: Boolean = false, shouldUser: Boolean = false) on FIELD_DEFINITION
	directive @guest(shouldAdmin: Boolean = false, shouldUser: Boolean = false) on FIELD_DEFINITION

	scalar Date

	enum LoginType {
		LOCAL
		FACEBOOK
		GOOGLE
	}

	enum GenderType {
		MALE
		FEMALE
		PREFER_NOT_TO_SAY
	}

	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}

	type Subscription {
		_: Boolean
	}

	type Message {
		success: Boolean!
		message: String!
		debugMessage: String
	}
`;

export default rootSchema;
