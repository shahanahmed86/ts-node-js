import chai from 'chai';
import chaiHttp from 'chai-http';
import { BASE_URL } from '../../../config';

chai.use(chaiHttp);

export const login = async (username: string = 'shahan', password: string = '123Abc456') => {
	return chai
		.request(BASE_URL)
		.post('/api/admin/auth')
		.set('content-type', 'application/json')
		.send({ username, password });
};

export const loggedIn = (token: string) => {
	return chai
		.request(BASE_URL)
		.get(`/api/admin/auth`)
		.set('content-type', 'application/json')
		.set('Authorization', `Bearer ${token}`);
};

export const changePassword = async (oldPassword: string, password: string, token: string) => {
	return chai
		.request(BASE_URL)
		.put('/api/admin/auth')
		.set('content-type', 'application/json')
		.set('Authorization', `Bearer ${token}`)
		.send({ oldPassword, password });
};
