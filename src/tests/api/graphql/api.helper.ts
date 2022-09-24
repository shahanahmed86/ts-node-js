import chai from 'chai';
import chaiHttp from 'chai-http';
import httpServer from '../../../';

chai.use(chaiHttp);

type Payload = {
	query: string;
	variables?: {
		[key: string]: any;
	};
};

export const callGraphqlApi = (payload: Payload) => {
	return chai.request(httpServer).post('/graphql').set('content-type', 'application/json').send(payload);
};
