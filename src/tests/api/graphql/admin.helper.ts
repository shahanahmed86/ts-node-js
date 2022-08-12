import chai from 'chai';
import chaiHttp from 'chai-http';
import { BASE_URL } from '../../../config';

chai.use(chaiHttp);

export const login = (username: string = 'shahan', password: string = '123Abc456') => {
	return chai
		.request(BASE_URL)
		.post('/graphql')
		.set('content-type', 'application/json')
		.send({
			query: `
				mutation Mutation($username: String!, $password: String!) {
					values: adminLogin(username: $username, password: $password) {
						token
						payload {
							id
							username
							createdAt
							updatedAt
						}
					}
				}
			`,
			variables: { username, password },
		});
};

export const loggedIn = (token: string) => {
	return chai
		.request(BASE_URL)
		.post('/graphql')
		.set('content-type', 'application/json')
		.set('Authorization', `Bearer ${token}`)
		.send({
			query: `
				query Query {
					values: adminLoggedIn {
						id
						username
						createdAt
						updatedAt
					}
				}
			`,
			variables: {},
		});
};

export const changePassword = async (oldPassword: string, password: string, token: string) => {
	return chai
		.request(BASE_URL)
		.post('/graphql')
		.set('content-type', 'application/json')
		.set('Authorization', `Bearer ${token}`)
		.send({
			query: `
				mutation Mutation($oldPassword: String!, $password: String!) {
					values: adminChangePassword(oldPassword: $oldPassword, password: $password)
				}
			`,
			variables: { oldPassword, password },
		});
};
