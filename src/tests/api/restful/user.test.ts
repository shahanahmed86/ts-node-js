import chai from 'chai';
import chaiHttp from 'chai-http';
import { commonHelper, userHelper } from '../../helper';

chai.use(chaiHttp);

const { expect } = chai;

describe('RESTful - User Authentication APIs', function () {
	it('user signup', async () => {
		const { body } = await commonHelper.uploadImage();
		const res = await userHelper.signup(
			'test-user',
			'123Abc456',
			body.path,
			'Shahan Ahmed',
			'shahan.khaan@gmail.com',
			'0092362122588',
			'MALE',
		);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.body.token).to.be.a('string');
		expect(res.body.payload).to.be.an('object');
		expect(res.body.payload).not.to.have.property('password');
		expect(res.body.payload.user).not.to.have.property('password');
	});

	it('user login', async () => {
		let res = await userHelper.login('test-user', 'test-user'); // should fail
		expect(res.error).not.to.be.false;
		expect(res.status).to.be.equal(401);
		expect(res.text).to.be.a('string');

		res = await userHelper.login(); // should success
		['token', 'payload'].map((prop) => expect(res.body).to.have.property(prop));
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.body.token).to.be.a('string');
		expect(res.body.payload).to.be.an('object');
		expect(res.body.payload).not.to.have.property('password');
		expect(res.body.payload.user).not.to.have.property('password');
	});

	it('user loggedIn', async () => {
		const { body: loginBody } = await userHelper.login();
		const token = loginBody.token;

		const res = await userHelper.loggedIn(token);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('object');
		expect(res.body).not.to.have.property('password');
		expect(res.body.user).not.to.have.property('password');
	});

	it('user changePassword', async () => {
		const { body: loginBody } = await userHelper.login();
		const token = loginBody.token;

		let res = await userHelper.changePassword('123abc456', 'shahan', token);
		expect(res.error).not.to.be.false;
		expect(res.status).to.be.equal(409);
		expect(res.text).to.be.a('string');

		res = await userHelper.changePassword('123Abc456', '123aBc456', token);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.text).to.be.a('string');

		res = await userHelper.changePassword('123aBc456', '123Abc456', token);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.text).to.be.a('string');
	});
});
