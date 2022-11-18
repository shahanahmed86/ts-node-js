import { Express } from 'express';
import { serve, setup } from 'swagger-ui-express';
import swaggerJsDoc, { Options } from 'swagger-jsdoc';
import { name as title, version, description } from '../../package.json';

// swagger options
const options: Options = {
	definition: {
		openapi: '3.0.0',
		info: {
			version,
			title,
			description,
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
	apis: ['./src/restful/routes/**/swagger*.ts'], // files containing annotations as above
};

// swagger setup
const specs = swaggerJsDoc(options);

const swagger = (app: Express) => {
	app.use('/api-docs', serve);
	app.get('/api-docs', setup(specs));
};

export default swagger;
