import Joi from 'joi';
import { GENDER_OPTIONS } from '../utils/constants.utils';
import { usernameSchema, passwordSchema } from './common.validations';

const avatarSchema = Joi.string().uri().label('avatar').disallow('');
const fullNameSchema = Joi.string().min(3).max(30).label('full name').disallow('');
const emailSchema = Joi.string().email().label('email').disallow('');
const cellSchema = Joi.string()
	.regex(/^[0-9]{10}$/)
	.label('cell number')
	.messages({ 'string.pattern.base': '{#label} must have 10 digits' });
const genderSchema = Joi.string()
	.valid(...GENDER_OPTIONS)
	.label('gender')
	.disallow('');

export const userLoginSchema = Joi.object({ username: usernameSchema, password: passwordSchema });

export const userChangePasswordSchema = Joi.object({
	oldPassword: passwordSchema.label('old password'),
	password: passwordSchema.disallow(Joi.ref('oldPassword')).label('new password').messages({
		'any.invalid': '{#label} cannot be same as old one',
	}),
});

export const userSignUpSchema = Joi.object({
	username: usernameSchema,
	password: passwordSchema,
	avatar: avatarSchema,
	fullName: fullNameSchema,
	email: emailSchema,
	cell: cellSchema,
	gender: genderSchema,
});
