import chai from 'chai';
import chaiHttp from 'chai-http';
import { BASE_URL } from '../../../config';
import { GenderType } from '../../../types/common.types';

chai.use(chaiHttp);

export const login = (username: string = 'test-user', password: string = '123Abc456') => {
	return chai
		.request(BASE_URL)
		.post('/graphql')
		.set('content-type', 'application/json')
		.send({
			query: `
				mutation Mutation($username: String!, $password: String!) {
					values: userLogin(username: $username, password: $password) {
						token
						payload {
							id
							username
							avatar
							fullName
							email
							cell
							gender
							user {
								id
								createdAt
								updatedAt
							}
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
				query UserLoggedIn {
					values: userLoggedIn {
						id
						username
						avatar
						fullName
						email
						cell
						gender
						user {
							id
							createdAt
							updatedAt
						}
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
					values: userChangePassword(oldPassword: $oldPassword, password: $password)
				}
			`,
			variables: { oldPassword, password },
		});
};

export const signUp = async (
	username: string,
	password: string,
	avatar?: string,
	fullName?: string,
	email?: string,
	cell?: string,
	gender?: GenderType,
) => {
	return chai
		.request(BASE_URL)
		.post('/graphql')
		.set('content-type', 'application/json')
		.send({
			query: `
				mutation UserSignUp($username: String!, $password: String!, $avatar: String, $fullName: String, $email: String, $cell: String, $gender: GenderType) {
					values: userSignUp(username: $username, password: $password, avatar: $avatar, fullName: $fullName, email: $email, cell: $cell, gender: $gender) {
						token
						payload {
							id
							username
							avatar
							fullName
							email
							cell
							gender
							user {
								id
								updatedAt
								createdAt
							}
							createdAt
							updatedAt
						}
					}
				}
			`,
			variables: { username, password, avatar, fullName, email, cell, gender },
		});
};
