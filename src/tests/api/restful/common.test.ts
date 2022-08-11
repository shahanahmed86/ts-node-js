import chai from 'chai';
import chaiHttp from 'chai-http';
import { commonHelper } from '../../helper';

chai.use(chaiHttp);

const { expect } = chai;

describe('RESTful - Common APIs', function () {
	it('healthcheck', async () => {
		const res = await commonHelper.healthcheck();
		expect(res.status).to.be.equal(200);
		expect(res.text).to.be.a('string');
	});

	it('upload image', async () => {
		const { error, body } = await commonHelper.uploadImage();

		expect(error).to.be.false;
		expect(body).to.be.an('object');
		expect(body.path).to.contains('temp/');

		await commonHelper.deleteImage(body.path);
	});

	it('get image', async () => {
		const { body } = await commonHelper.uploadImage();
		const { error } = await commonHelper.getImage(body.path);

		expect(error).to.be.false;
		await commonHelper.deleteImage(body.path);
	});

	it('delete image', async () => {
		const { body } = await commonHelper.uploadImage();

		let res = await commonHelper.deleteImage(body.path);
		expect(res.error).to.be.false;
		expect(res.text).to.be.a('string');

		res = await commonHelper.deleteImage(body.path);
		expect(res.error).not.to.be.false;
		expect(res.status).to.be.equal(404);
		expect(res.text).to.be.a('string');
	});
});
