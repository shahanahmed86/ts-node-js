import { ObjectSchema } from 'joi';
import { UserTypes } from '../../types/common.types';
import { getUserType, joiValidator } from '../../utils/logics.utils';

type ResolveJoiValidator = (schema: ObjectSchema, args: object) => Promise<boolean>;
export const resolveJoiValidator: ResolveJoiValidator = (schema, args) => {
	return new Promise((resolve) => {
		joiValidator(schema, args)
			.then(() => resolve(true))
			.catch(() => resolve(false));
	});
};

type ResponseGetUserType = { success: boolean; key?: string };
export const resolveGetUserType = (directive: UserTypes): ResponseGetUserType => {
	try {
		const key = getUserType(directive);
		return { success: true, key };
	} catch (error) {
		return { success: false };
	}
};
