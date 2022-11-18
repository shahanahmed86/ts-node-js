import { User, SignUp } from '@prisma/client';
import { Request } from 'express';
import { FileArray, UploadedFile } from 'express-fileupload';
import { HttpError } from '../utils/errors.utils';

export interface IRequest extends Request {
	query: {
		[key: string]: string;
	};
	userId?: string;
	adminId?: string;
	error?: HttpError;
}

export interface _SignUp extends SignUp {
	user: Partial<User>;
}

export interface IFileArray extends FileArray {
	uploadedFile: UploadedFile;
}
