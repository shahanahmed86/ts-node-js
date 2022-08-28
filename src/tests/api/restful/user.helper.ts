import chai from 'chai';
import chaiHttp from 'chai-http';
import { GenderType } from '../../../types/common.types';
import httpServer from '../../../';

chai.use(chaiHttp);

export const signup = async (
	username: string,
	password: string,
	avatar?: string,
	fullName?: string,
	email?: string,
	cell?: string,
	gender?: GenderType,
) => {
	return chai
		.request(httpServer)
		.post('/api/user/auth/signup')
		.set('content-type', 'application/json')
		.send({ username, password, avatar, fullName, email, cell, gender });
};

export const login = async (username: string = 'test-user', password: string = '123Abc456') => {
	return chai
		.request(httpServer)
		.post('/api/user/auth')
		.set('content-type', 'application/json')
		.send({ username, password });
};

export const loggedIn = (token: string) => {
	return chai
		.request(httpServer)
		.get(`/api/user/auth`)
		.set('content-type', 'application/json')
		.set('Authorization', `Bearer ${token}`);
};

export const changePassword = async (oldPassword: string, password: string, token: string) => {
	return chai
		.request(httpServer)
		.put('/api/user/auth')
		.set('content-type', 'application/json')
		.set('Authorization', `Bearer ${token}`)
		.send({ oldPassword, password });
};
