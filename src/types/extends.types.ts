import { Request } from 'express';
import { HttpError } from '../utils/errors.utils';

export interface IRequest extends Request {
	query: {
		[key: string]: string;
	};
	userId?: string;
	adminId?: string;
	error?: HttpError;
}
