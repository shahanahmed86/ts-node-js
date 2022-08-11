import chai from 'chai';
import chaiHttp from 'chai-http';
import { adminHelper } from '../../helper';

chai.use(chaiHttp);

const { expect } = chai;

describe('RESTful - Admin Authentication APIs', function () {
	it('admin login', async () => {
		let res = await adminHelper.login('shahan', 'shahan'); // should fail
		expect(res.error).not.to.be.false;
		expect(res.status).to.be.equal(401);
		expect(res.text).to.be.oneOf(['username or password is incorrect']);

		res = await adminHelper.login(); // should success
		['token', 'payload'].map((prop) => expect(res.body).to.have.property(prop));
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.body.token).to.be.a('string');
		expect(res.body.payload).to.be.an('object');
		expect(res.body.payload).not.to.have.property('password');
	});

	it('admin loggedIn', async () => {
		const { body: loginBody } = await adminHelper.login();
    const token = loginBody.token;

    const res = await adminHelper.loggedIn(token);
		expect(res.error).to.be.false;
		expect(res.status).to.be.equal(200);
		expect(res.body).to.be.an('object');
		expect(res.body).not.to.have.property('password');
	});

  it('admin changePassword', async () => {
		const { body: loginBody } = await adminHelper.login();
    const token = loginBody.token;

    let res = await adminHelper.changePassword('123abc456', 'shahan', token);
		expect(res.error).not.to.be.false;
    expect(res.status).to.be.equal(409);
    expect(res.text).to.be.a('string');

    res = await adminHelper.changePassword('123Abc456', '123aBc456', token);
    expect(res.error).to.be.false;
    expect(res.status).to.be.equal(200);
    expect(res.text).to.be.a.string('password changed successfully')

    res = await adminHelper.changePassword('123aBc456', '123Abc456', token);
    expect(res.error).to.be.false;
    expect(res.status).to.be.equal(200);
    expect(res.text).to.be.a.string('password changed successfully')
  })
});
