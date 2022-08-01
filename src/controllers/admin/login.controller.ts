import _ from 'lodash';
import { compareSync, encodePayload, Prisma, prisma } from '../../library';
import { Controller } from '../../types/wrapper.types';
import { NotAuthenticated } from '../../utils';

interface Args {
	username: string;
	password: string;
}

interface Response {
	token: string;
	payload: Omit<Prisma.AdminCreateInput, 'password'>;
}

enum UserType {
	userId = 'userId',
	adminId = 'adminId',
}

const notAuthenticated: string = 'Username or password is incorrect';

export const login: Controller<Args, Response> = async (root, args) => {
	if (!args.username.trim() || !args.password.trim()) {
		throw new NotAuthenticated('Username and Password cannot be empty...');
	}

	const admin = await prisma.admin.findFirst({ where: { username: args.username } });
	if (!admin) throw new NotAuthenticated(notAuthenticated);

	const password = compareSync(args.password, admin.password);
	if (!password) throw new NotAuthenticated(notAuthenticated);

	const token = encodePayload(admin.id, UserType.adminId);

	const payload = _.omit(admin, ['password']);

	return { token, payload };
};
