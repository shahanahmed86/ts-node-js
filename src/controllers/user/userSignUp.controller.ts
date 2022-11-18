import { Prisma } from '@prisma/client';
import { encodePayload, hashSync, prisma } from '../../library';
import { Controller } from '../../types/wrapper.types';
import { ConflictError } from '../../utils/errors.utils';
import {
	getSessionEndsAt,
	getZeroTimeZone,
	includeDeleteParams,
	joiValidator,
	omitProps,
} from '../../utils/logics.utils';
import { userSignUpSchema } from '../../validation';
import file from '../../library/file.library';
import { _SignUp } from '../../types/extends.types';

interface Args extends _SignUp {
	username: string;
	password: string;
}

type Result = {
	token: string;
	payload: Partial<_SignUp>;
};

export const userSignUp: Controller<null, Args, Result> = async (root, args) => {
	await joiValidator(userSignUpSchema, args);

	const where = includeDeleteParams<Prisma.SignUpWhereInput>({
		username: args.username,
		type: 'LOCAL',
	});
	const signedUpUser = await prisma.signUp.findFirst({ where });
	if (signedUpUser) throw new ConflictError('user with this name is already exists');

	const now = getZeroTimeZone();

	const data: Prisma.SignUpCreateInput = {
		createdAt: now,
		updatedAt: now,
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
	if (args.avatar) data.avatar = await file.moveImageFromTmp(args.avatar);

	const signUp = await prisma.signUp.create({ data, include: { user: true } });

	const token = encodePayload(signUp.userId, 'userId');

	const endsAt = getSessionEndsAt();

	await prisma.session.upsert({
		where: { userId: signUp.user.id },
		update: {
			token,
			endsAt,
			updatedAt: now,
			isPublished: false,
		},
		create: {
			token,
			userId: signUp.user.id,
			endsAt,
			createdAt: now,
			updatedAt: now,
		},
	});

	return { token, payload: omitProps(signUp) };
};
