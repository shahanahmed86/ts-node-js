import _ from 'lodash';
import { compareSync, encodePayload, Prisma, prisma } from '../../library';
import { Controller } from '../../types/wrapper.types';
import { NotAuthenticated } from '../../utils/errors.utils';
import { includeDeleteParams, joiValidator } from '../../utils/logics.utils';
import { SHOULD_OMIT_PROPS } from '../../utils/constants.utils';
import { LoginType } from '../../types/common.types';
import { userLoginSchema } from '../../validation';

interface Args {
	loginType: LoginType;
	username: string;
	password: string;
}

interface Response {
	token: string;
	payload: object;
}

const notAuthenticated: string = 'username or password is incorrect';

export const login: Controller<Args, Response> = async (root, args) => {
	await joiValidator(userLoginSchema, args);

	const { loginType = 'LOCAL', username, password } = args;
	const findArgs: Prisma.SignUpFindFirstArgs = {
		where: includeDeleteParams({
			username,
			type: loginType,
			user: includeDeleteParams({ defaultLogin: loginType } as Prisma.UserWhereInput),
		} as Prisma.SignUpWhereInput),
	};

	const signUp = await prisma.signUp.findFirst(findArgs);
	if (!signUp) throw new NotAuthenticated(notAuthenticated);

	const isMatch = compareSync(password, signUp.password as string);
	if (!isMatch) throw new NotAuthenticated(notAuthenticated);

	const token = encodePayload(signUp.userId, 'userId');

	const payload = _.omit(signUp, SHOULD_OMIT_PROPS);

	return { token, payload };
};
