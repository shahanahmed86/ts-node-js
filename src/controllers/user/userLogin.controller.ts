import { Prisma } from '@prisma/client';
import { compareSync, encodePayload, prisma } from '../../library';
import { _SignUp } from '../../types/extends.types';
import { Controller } from '../../types/wrapper.types';
import { NotAuthenticated } from '../../utils/errors.utils';
import { includeDeleteParams, joiValidator, omitProps } from '../../utils/logics.utils';
import { userLoginSchema } from '../../validation';

type Args = {
	username: string;
	password: string;
};

type Result = {
	token: string;
	payload: Partial<_SignUp>;
};

const notAuthenticated = 'username or password is incorrect';

export const userLogin: Controller<null, Args, Result> = async (root, args) => {
	await joiValidator(userLoginSchema, args);

	const { username, password } = args;

	const userWhere: Prisma.UserWhereInput = includeDeleteParams({ defaultLogin: 'LOCAL' });
	const where: Prisma.SignUpWhereInput = includeDeleteParams({
		username,
		type: 'LOCAL',
		user: userWhere,
	});

	const signUp = await prisma.signUp.findFirst({ where, include: { user: true } });
	if (!signUp) throw new NotAuthenticated(notAuthenticated);

	if (signUp.password) {
		const isMatch = compareSync(password, signUp.password);
		if (!isMatch) throw new NotAuthenticated(notAuthenticated);
	}

	const token = encodePayload(signUp.userId, 'userId');

	return { token, payload: omitProps(signUp) };
};
