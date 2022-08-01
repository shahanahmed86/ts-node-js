import _ from 'lodash';
import { compareSync, encodePayload, Prisma, prisma } from '../../library';
import { Controller } from '../../types/wrapper.types';
import { includeDeleteParams, NotAuthenticated, SHOULD_OMIT_PROPS } from '../../utils';

interface Args {
	loginType: 'LOCAL' | 'FACEBOOK' | 'GOOGLE';
	username: string;
	password: string;
}

interface Response {
	token: string;
	payload: object;
}

const notAuthenticated: string = 'Username or password is incorrect';

export const login: Controller<Args, Response> = async (root, args) => {
	if (!args.username.trim() || !args.password.trim()) {
		throw new NotAuthenticated('Username and Password cannot be empty...');
	}

	const { loginType, username, password } = args;
	const signUpParams: Prisma.SignUpFindFirstArgs = {
		where: includeDeleteParams({
			username,
			password,
			type: loginType,
			user: includeDeleteParams({ defaultLogin: loginType } as Prisma.UserWhereInput),
		} as Prisma.SignUpWhereInput),
	};

	const signUp = await prisma.signUp.findFirst(signUpParams);
	if (!signUp) throw new NotAuthenticated(notAuthenticated);

	const isMatch = compareSync(args.password, signUp.password as string);
	if (!isMatch) throw new NotAuthenticated(notAuthenticated);

	const token = encodePayload(signUp.userId, 'userId');

	const payload = _.omit(signUp, SHOULD_OMIT_PROPS);

	return { token, payload };
};
