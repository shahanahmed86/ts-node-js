import { v4 as uuidV4 } from 'uuid';
import _ from 'lodash';
import { ObjectSchema } from 'joi';
import { BadRequest, ConflictError, HttpError } from './errors.utils';
import { EXPIRES_IN_MILLISECONDS, SHOULD_OMIT_PROPS } from './constants.utils';
import { GetUserType } from '../types/common.types';

type GetMillSeconds = (value?: number) => number;
export const getMilliSeconds: GetMillSeconds = (value = Date.now()) => new Date(value).getTime();

type GetZeroTimeZone = (value?: Date) => string;
export const getZeroTimeZone: GetZeroTimeZone = (value = new Date()) => value.toISOString();

type GetSessionEndsAt = (value?: number) => string;
export const getSessionEndsAt: GetSessionEndsAt = (value = EXPIRES_IN_MILLISECONDS) => {
	return new Date(Date.now() + value).toISOString();
};

export const convertUnknownIntoError = (err: unknown | any): HttpError => {
	let error: HttpError;

	if (err instanceof HttpError) error = err;
	else if (typeof err === 'string' && err) error = new BadRequest(err);
	else if (err instanceof Error) error = new BadRequest(err.message);
	else error = new BadRequest();

	// this will remove inverted commas from an error string
	error.message = error.message.replace(/['"]+/g, '');

	return error;
};

export function includeDeleteParams<T>(where: T): T {
	return Object.assign(where, { isDeleted: false, deletedAt: null });
}

export const joiValidator = async (schema: ObjectSchema, payload: { [key: string]: any }): Promise<any> => {
	try {
		await schema.validateAsync(payload, { abortEarly: false });
	} catch (e) {
		const error = convertUnknownIntoError(e);
		throw new ConflictError(error.message);
	}
};

export const omitProps = (obj: { [key: string]: any }, props: string[] = SHOULD_OMIT_PROPS) => {
	const objectKey = Object.keys(obj).find((key) => obj[key] && typeof key === 'object' && !(obj[key] instanceof Date));
	if (objectKey) return _.omit(obj[objectKey], props);
	return _.omit(obj, props);
};

export const getUserType: GetUserType = (userTypes) => {
	const { shouldAdmin, shouldUser } = userTypes;

	if ((shouldAdmin && shouldUser) || (!shouldAdmin && !shouldUser)) throw new BadRequest();
	if (shouldAdmin) return 'adminId';
	if (shouldUser) return 'userId';

	throw new BadRequest();
};

export const getUniqueId = () => uuidV4();
