import os from 'os';
import express, { Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { notFound } from './middleware/errors.middleware';
import routes from './routes';
import { logger } from '../library';

// initiate express app;
const app: Application = express();

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

console.log('updated...');
// middleware(s) for error handling
app.use(notFound);

export default app;
