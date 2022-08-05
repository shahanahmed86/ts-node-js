import { encodePayload, hashSync, Prisma, prisma } from '../../library';
import { GenderType } from '../../types/common.types';
import { Controller } from '../../types/wrapper.types';
import { ConflictError } from '../../utils/errors.utils';
import {
	getZeroTimeZone,
	includeDeleteParams,
	joiValidator,
	omitProps,
} from '../../utils/logics.utils';
import { userSignUpSchema } from '../../validation';

type Args = {
	username: string;
	password: string;
	avatar?: string;
	fullName?: string;
	email?: string;
	cell?: string;
	gender?: GenderType;
};

type Result = {
	token: string;
	payload: Prisma.SignUpWhereInput;
};

export const register: Controller<null, Args, Result> = async (root, args) => {
	await joiValidator(userSignUpSchema, args);

	const where: Prisma.SignUpWhereInput = includeDeleteParams({
		username: args.username,
		type: 'LOCAL',
	});
	const signedUpUser = await prisma.signUp.findFirst({ where });
	if (signedUpUser) throw new ConflictError('user with this name is already exists');

	const now = getZeroTimeZone();

	const data: Prisma.SignUpCreateInput = {
		createdAt: now,
		updatedAt: now,
		avatar: args.avatar,
		cell: args.cell,
		email: args.email,
		fullName: args.fullName,
		gender: args.gender,
		username: args.username,
		password: hashSync(args.password),
		user: {
			create: {
				createdAt: now,
				updatedAt: now,
			},
		},
	};

	const signUp = await prisma.signUp.create({ data, include: { user: true } });

	const token = encodePayload(signUp.userId, 'userId');

	const payload: Prisma.SignUpWhereInput = omitProps(signUp);
	payload.user = omitProps(signUp.user);

	const result: Result = { token, payload };

	return result;
};
