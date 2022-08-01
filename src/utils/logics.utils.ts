import { BadRequest, HttpError } from './errors.utils';

export const getMillSeconds = (value: number = Date.now()): number => new Date(value).getTime();

export const getZeroTimeZone = (value: Date = new Date()): string => value.toISOString();

export const convertUnknownIntoError = (err: unknown): HttpError => {
	let error: HttpError;

	if (err instanceof HttpError) error = err;
	else if (typeof err === 'string') error = new BadRequest(err);
	else if (err instanceof Error) error = new BadRequest(err.message);
	else error = new BadRequest();

	return error;
};

interface DeleteParams {
	[key: string]: any;
	isDeleted: boolean;
	deletedAt: null;
}
type IncludeDeleteParams = (where: object) => DeleteParams;
export const includeDeleteParams: IncludeDeleteParams = (where = {}) => {
	return Object.assign(where, { isDeleted: false, deletedAt: null });
};
