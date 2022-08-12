import chai from 'chai';
import chaiHttp from 'chai-http';
import { commonHelper } from '../../helper';
import * as userHelper from './user.helper';

chai.use(chaiHttp);

const { expect } = chai;

describe('Graphql - User Authentication APIs', function () {
	it('user signup', async () => {
		const res = await commonHelper.uploadImage();
		const { body } = await userHelper.signUp(
			'test-user',
			'123Abc456',
			res.body.path,
			'Shahan Ahmed',
			'shahan.khaan@gmail.com',
			'0092362122588',
			'MALE',
		);
		expect(body.data.values.token).to.be.a('string');
		expect(body.data.values.payload).to.be.an('object');
		expect(body.data.values.payload).not.to.have.property('password');
	});

	it('user login', async () => {
		const res = await userHelper.login('shahan', 'shahan'); // should fail
		expect(res.body).to.have.a.property('errors').to.be.an('array');

		const { body } = await userHelper.login(); // should success
		['token', 'payload'].map((prop) => expect(body.data.values).to.have.property(prop));
		expect(body.data.values.token).to.be.a('string');
		expect(body.data.values.payload).to.be.an('object');
		expect(body.data.values.payload).not.to.have.property('password');
	});

	it('user loggedIn', async () => {
		const res = await userHelper.login();
		const token = res.body.data.values.token;

		const { body } = await userHelper.loggedIn(token);
		expect(body.data.values).to.be.an('object');
		expect(body.data.values).not.to.have.property('password');
	});

	it('user changePassword', async () => {
		const { body: loginBody } = await userHelper.login();
		const token = loginBody.data.values.token;

		let res = await userHelper.changePassword('123abc456', 'shahan', token);
		expect(res.body).to.have.a.property('errors').to.be.an('array');

		res = await userHelper.changePassword('123Abc456', '123aBc456', token);
		expect(res.body.data.values).to.be.a('string');

		res = await userHelper.changePassword('123aBc456', '123Abc456', token);
		expect(res.body.data.values).to.be.a('string');
	});

	after(() => commonHelper.hardDelete());
});
