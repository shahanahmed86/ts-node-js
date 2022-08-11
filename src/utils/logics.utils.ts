import { v4 as uuidV4 } from 'uuid';
import _ from 'lodash';
import { ObjectSchema } from 'joi';
import { BadRequest, ConflictError, HttpError } from './errors.utils';
import { SHOULD_OMIT_PROPS } from './constants.utils';
import { GetUserType } from '../types/common.types';

type GetMillSeconds = (value?: number) => number;
export const getMillSeconds: GetMillSeconds = (value = Date.now()) => new Date(value).getTime();

type GetZeroTimeZone = (value?: Date) => string;
export const getZeroTimeZone: GetZeroTimeZone = (value = new Date()) => value.toISOString();

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

export const joiValidator = async (schema: ObjectSchema, payload: any): Promise<any> => {
	try {
		await schema.validateAsync(payload, { abortEarly: false });
	} catch (e) {
		const error = convertUnknownIntoError(e);
		throw new ConflictError(error.message);
	}
};

export const omitProps = (obj: object, props?: string[]) => _.omit(obj, props || SHOULD_OMIT_PROPS);

export const getUserType: GetUserType = (userTypes) => {
	const { shouldAdmin, shouldUser } = userTypes;

	if ((shouldAdmin && shouldUser) || (!shouldAdmin && !shouldUser)) throw new BadRequest();
	if (shouldAdmin) return 'adminId';
	if (shouldUser) return 'userId';

	throw new BadRequest();
};

export const getUniqueId = () => uuidV4();
