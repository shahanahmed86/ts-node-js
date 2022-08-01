import _ from 'lodash';
import { compareSync, encodePayload, Prisma, prisma } from '../../library';
import { Controller } from '../../types/wrapper.types';
import { NotAuthenticated, SHOULD_OMIT_PROPS } from '../../utils';

interface Args {
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

	const params: Prisma.AdminFindFirstArgs = { where: { username: args.username } };
	const admin = await prisma.admin.findFirst(params);
	if (!admin) throw new NotAuthenticated(notAuthenticated);

	const isMatch = compareSync(args.password, admin.password);
	if (!isMatch) throw new NotAuthenticated(notAuthenticated);

	const token = encodePayload(admin.id, 'adminId');

	const payload = _.omit(admin, SHOULD_OMIT_PROPS);

	return { token, payload };
};
