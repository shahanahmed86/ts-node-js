import _ from 'lodash';
import { encodePayload, hashSync, Prisma, prisma } from '../../library';
import { GenderType } from '../../types/common.types';
import { Controller } from '../../types/wrapper.types';
import { SHOULD_OMIT_PROPS } from '../../utils/constants.utils';
import { ConflictError } from '../../utils/errors.utils';
import { getZeroTimeZone, includeDeleteParams, joiValidator } from '../../utils/logics.utils';
import { userSignUpSchema } from '../../validation';

interface Args {
	username: string;
	password: string;
	avatar?: string;
	fullName?: string;
	email?: string;
	cell?: string;
	gender?: GenderType;
}

interface Response {
	token: string;
	payload: object;
}

export const signUp: Controller<Args, Response> = async (root, args) => {
	await joiValidator(userSignUpSchema, args);

	const findArgs: Prisma.SignUpFindFirstArgs = {
		where: includeDeleteParams({
			username: args.username,
			type: 'LOCAL',
		} as Prisma.SignUpWhereInput),
	};
	const signedUpUser = await prisma.signUp.findFirst(findArgs);
	if (signedUpUser) throw new ConflictError('user with this name is already exists');

	const now = getZeroTimeZone();

	const data: Prisma.UserCreateInput = {
		createdAt: now,
		updatedAt: now,
		signUps: {
			create: {
				createdAt: now,
				updatedAt: now,
				avatar: args.avatar,
				cell: args.cell,
				email: args.email,
				fullName: args.fullName,
				gender: args.gender,
				username: args.username,
				password: hashSync(args.password),
			},
		},
	};

	const [user] = await prisma.user.create({ data }).signUps({ where: { type: 'LOCAL' } });

	const token = encodePayload(user.userId, 'userId');

	const payload = _.omit(user, SHOULD_OMIT_PROPS);

	return { token, payload };
};
