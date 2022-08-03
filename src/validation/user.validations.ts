import Joi from 'joi';
import { GENDER_OPTIONS, LOGIN_TYPES } from '../utils/constants.utils';
import { usernameSchema, passwordSchema } from './common.validations';

const loginTypeSchema = Joi.string()
	.valid(...LOGIN_TYPES)
	.label('login type')
	.disallow('');

const avatarSchema = Joi.string().uri().label('avatar').disallow('');
const fullNameSchema = Joi.string().min(3).max(30).label('full name').disallow('');
const emailSchema = Joi.string().email().label('email').disallow('');
const cellSchema = Joi.string()
	.regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,10}$/im)
	.label('cell number')
	.messages({ 'string.pattern.base': '{#label} must have 10 digits' });
const genderSchema = Joi.string()
	.valid(...GENDER_OPTIONS)
	.label('gender')
	.disallow('');

export const userSignUpSchema = Joi.object({
	username: usernameSchema,
	password: passwordSchema,
	avatar: avatarSchema,
	fullName: fullNameSchema,
	email: emailSchema,
	cell: cellSchema,
	gender: genderSchema,
});

export const userLoginSchema = Joi.object({
	loginType: loginTypeSchema,
	username: usernameSchema,
	password: usernameSchema.label('password'),
});
