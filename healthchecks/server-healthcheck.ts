import http, { RequestOptions, ClientRequest, IncomingMessage } from 'http';
import { PORT } from '../src/config';

const options: RequestOptions | string | URL = {
	timeout: 2000,
	host: 'localhost',
	port: PORT,
	path: '/api/healthcheck', // must be the same as HEALTHCHECK in Dockerfile
};

const request: ClientRequest = http.request(options, (res: IncomingMessage) => {
	console.info('STATUS: ' + res.statusCode);
	process.exitCode = res.statusCode === 200 ? 0 : 1;
	process.exit();
});

request.on('error', (err: Error) => {
	console.error('ERROR', err);
	process.exit(1);
});

request.end();
