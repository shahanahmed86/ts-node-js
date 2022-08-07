import Joi from 'joi';
import { usernameSchema } from './common.validations';

export const adminLoginSchema = Joi.object({
	username: usernameSchema.required(),
	password: usernameSchema.label('password'),
}).required();
