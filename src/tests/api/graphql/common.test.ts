import chai from 'chai';
import chaiHttp from 'chai-http';
import { GENDER_OPTIONS } from '../../../utils/constants.utils';
import { callGraphqlApi } from './api.helper';

chai.use(chaiHttp);

const { expect } = chai;

describe('Graphql - Common APIs', function () {
	it('get gender', async () => {
		const { body, error, status } = await callGraphqlApi({
			query: `
        query Query {
          values: genderOptions
        }
      `,
			variables: {},
		});
		GENDER_OPTIONS.map((gender) => expect(body.data.values).to.be.an('array').that.include(gender));
		expect(error).to.be.false;
		expect(status).to.be.equal(200);
	});
});
