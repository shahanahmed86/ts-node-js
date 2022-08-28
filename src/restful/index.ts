import fs from 'fs';
import path from 'path';
import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { notFound } from './middleware/errors.middleware';
import routes from './routes';
import { logger } from '../library';

// initiate express app;
const app = express();

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

// serving builds
const buildsStatic = path.resolve('./builds');
if (!fs.existsSync(buildsStatic)) fs.mkdirSync(buildsStatic);

app.use(express.static(buildsStatic));

const builds = fs.readdirSync(buildsStatic);

for (const build of builds) {
	const isDirectory = fs.statSync(path.join(buildsStatic, build)).isDirectory();
	if (!isDirectory) continue;

	app.get(`/${build}/*`, (_req, res) => {
		res.sendFile(path.resolve(buildsStatic, build, 'index.html'));
	});
}

// middleware(s) for no routes
app.use(notFound);

export default app;
