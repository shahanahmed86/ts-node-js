import chai from 'chai';
import chaiHttp from 'chai-http';
import { commonHelper } from '../../helper';

chai.use(chaiHttp);

const { expect } = chai;

describe('RESTful - Common APIs', function () {
	it('healthcheck', async () => {
		try {
			const res = await commonHelper.healthcheck();
			expect(res.status).to.be.equal(200);
			expect(res.text).to.be.a('string');
		} catch (error) {
			expect(error).not.to.be.null;
		}
	});
});
