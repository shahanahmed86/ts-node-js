import chai from 'chai';
import chaiHttp from 'chai-http';
import { BASE_URL } from '../../config';

chai.use(chaiHttp);

export const healthcheck = () => chai.request(BASE_URL).get('/api/healthcheck');
