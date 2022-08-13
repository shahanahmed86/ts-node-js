import chai from 'chai';
import chaiHttp from 'chai-http';
import httpServer from '../../../';

chai.use(chaiHttp);

export const login = async (username: string = 'shahan', password: string = '123Abc456') => {
	return chai
		.request(httpServer)
		.post('/api/admin/auth')
		.set('content-type', 'application/json')
		.send({ username, password });
};

export const loggedIn = (token: string) => {
	return chai
		.request(httpServer)
		.get(`/api/admin/auth`)
		.set('content-type', 'application/json')
		.set('Authorization', `Bearer ${token}`);
};

export const changePassword = async (oldPassword: string, password: string, token: string) => {
	return chai
		.request(httpServer)
		.put('/api/admin/auth')
		.set('content-type', 'application/json')
		.set('Authorization', `Bearer ${token}`)
		.send({ oldPassword, password });
};
