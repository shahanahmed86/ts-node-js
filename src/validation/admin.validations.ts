import Joi from 'joi';
import { usernameSchema, passwordSchema } from './common.validations';

export const adminLoginSchema = Joi.object({
	username: usernameSchema.required(),
	password: passwordSchema.required(),
});
