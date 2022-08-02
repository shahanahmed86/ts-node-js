import Joi from 'joi';
import { BCRYPT_MAX_BYTES } from '../config';
import { LOGIN_TYPES } from '../utils/constants.utils';

export const usernameSchema = Joi.string().min(3).max(20).trim().label('username');
export const passwordSchema = Joi.string()
	.min(6)
	.max(BCRYPT_MAX_BYTES, 'utf8')
	.trim()
	.regex(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u)
	.label('password')
	.messages({
		'string.pattern.base': '{#label} must contain at least one uppercase/lowercase/digit...',
	});

export const changePasswordSchema = Joi.object({
	oldPassword: passwordSchema.label('old password'),
	password: passwordSchema.disallow(Joi.ref('oldPassword')).label('new password').messages({
		'any.invalid': '{#label} cannot be same as old one',
	}),
});

export const loginType = Joi.string()
	.valid(...LOGIN_TYPES)
	.label('login type')
	.disallow('');
