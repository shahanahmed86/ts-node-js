import { ObjectSchema } from 'joi';
import { IncludeDeleteParams } from '../types/common.types';
import { BadRequest, HttpError } from './errors.utils';

type GetMillSeconds = (value: number) => number;
export const getMillSeconds: GetMillSeconds = (value = Date.now()) => new Date(value).getTime();

type GetZeroTimeZone = (value?: Date) => string;
export const getZeroTimeZone: GetZeroTimeZone = (value = new Date()) => value.toISOString();

export const convertUnknownIntoError = (err: unknown | any): HttpError => {
	let error: HttpError;

	if (err instanceof HttpError) error = err;
	else if (typeof err === 'string') error = new BadRequest(err);
	else if (err instanceof Error) error = new BadRequest(err.message);
	else error = new BadRequest();

	// this will remove inverted commas from an error string...
	error.message = error.message.replace(/['"]+/g, '');

	return error;
};

export const includeDeleteParams: IncludeDeleteParams = (where = {}) => {
	return Object.assign(where, { isDeleted: false, deletedAt: null });
};

export const joiValidator = async (schema: ObjectSchema, payload: any) => {
	return schema.validateAsync(payload, { abortEarly: false });
};
