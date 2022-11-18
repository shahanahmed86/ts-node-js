import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { notFound } from './middleware/errors.middleware';
import routes from './routes';
import { logger } from '../library';
import { IN_PROD } from '../config/app.config';
import swagger from '../library/swagger.library';

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

// swagger
if (!IN_PROD) swagger(app);

// routings
app.use('/api', routes);

// middleware(s) for no routes
app.use(notFound);

export default app;
