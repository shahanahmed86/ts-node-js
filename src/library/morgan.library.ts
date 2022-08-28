import fs from 'fs';
import os from 'os';
import morgan from 'morgan';
import { IRequest } from '../types/extends.types';
import { IN_PROD } from '../config/app.config';
import { MORGAN_TOKENS } from '../utils/constants.utils';
import { Request, Response } from 'express';

morgan.token('host', os.hostname);
morgan.token('error', (req: IRequest) => (req.error ? req.error.message : ''));

const skip = (_req: Request, res: Response) => (IN_PROD ? res.statusCode < 400 : false);
const stream = IN_PROD ? fs.createWriteStream('./logs/error.log', { flags: 'a' }) : undefined;

const logger = morgan(MORGAN_TOKENS, { skip, stream });

export default logger;
