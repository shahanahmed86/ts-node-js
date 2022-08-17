import fs from 'fs';
import path from 'path';
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
	res.status(200).send(`I am happy and healthy, from host ${os.hostname()}!\n`);
});

// serving builds
const buildsStatic = path.resolve(__dirname, '_builds');
if (!fs.existsSync(buildsStatic)) fs.mkdirSync(buildsStatic);
console.log('fs.existsSync(buildsStatic)....', fs.existsSync(buildsStatic));

app.use(express.static(buildsStatic));

const builds = fs.readdirSync(buildsStatic);
console.log('builds...', builds);
builds.forEach((file) => {
	const isDirectory = fs.statSync(path.join(buildsStatic, file)).isDirectory();
	if (isDirectory) {
		app.get(`/${file}/*`, (req, res) => {
			res.sendFile(path.resolve(buildsStatic, file, 'index.html'));
		});
	}
});

// middleware(s) for error handling
app.use(notFound);

export default app;
