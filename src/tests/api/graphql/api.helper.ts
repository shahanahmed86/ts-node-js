import chai from 'chai';
import chaiHttp from 'chai-http';
import { BASE_URL } from '../../../config';

chai.use(chaiHttp);

type Payload = {
	query: string;
	variables?: {
		[key: string]: any;
	};
};
export const callGraphqlApi = (payload: Payload) => {
	return chai
		.request(BASE_URL)
		.post('/graphql')
		.set('content-type', 'application/json')
		.send(payload);
};
