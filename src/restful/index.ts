import os from 'os';
import express, { Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import swaggerUI from 'swagger-ui-express';

import swaggerJsDoc from 'swagger-jsdoc';
import { name } from '../..//package.json';
import { IN_PROD } from '../config';
import { notFound } from './middleware/errors.middleware';
import routes from './routes';
import { logger } from '../library';

// initiate express app;
const app: Application = express();

if (!IN_PROD) {
	// swagger options
	const options: swaggerJsDoc.Options = {
		definition: {
			openapi: '3.0.0',
			info: {
				version: '1.0.0',
				title: name,
				description: 'APIs documentation',
			},
			basePath: '/',
			components: {
				securitySchemes: {
					bearerAuth: {
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'JWT',
					},
				},
			},
			security: [
				{
					bearerAuth: [],
				},
			],
		},
		apis: ['./src/restful/routes/**/swagger.*.ts'], // files containing annotations as above
	};

	// swagger setup
	const specs: object = swaggerJsDoc(options);

	app.use('/api-docs', swaggerUI.serve);
	app.get('/api-docs', swaggerUI.setup(specs));
}

// parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cors
app.use(cors());

// middleware for express-fileupload
app.use(fileUpload({ limits: { fileSize: 5 * 1024 * 1024 } }));

// logs
app.use(logger);

// x-powered-by
app.disable('x-powered-by');

// routings
app.use('/api', routes);

app.get('/api/healthcheck', (req, res) => {
	res.status(200).send(`I am happy and healthy, from host ${os.hostname}!\n`);
});

// middleware(s) for error handling
app.use(notFound);

export default app;
