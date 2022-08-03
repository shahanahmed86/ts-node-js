import _ from 'lodash';
import { compareSync, encodePayload, Prisma, prisma } from '../../library';
import { Controller } from '../../types/wrapper.types';
import { NotAuthenticated } from '../../utils/errors.utils';
import { SHOULD_OMIT_PROPS } from '../../utils/constants.utils';
import { joiValidator } from '../../utils/logics.utils';
import { adminLoginSchema } from '../../validation';

interface Args {
	username: string;
	password: string;
}

interface Response {
	token: string;
	payload: object;
}

const notAuthenticated: string = 'username or password is incorrect';

export const login: Controller<Args, Response> = async (root, args) => {
	await joiValidator(adminLoginSchema, args);

	const params: Prisma.AdminFindFirstArgs = { where: { username: args.username } };
	const admin = await prisma.admin.findFirst(params);
	if (!admin) throw new NotAuthenticated(notAuthenticated);

	const isMatch = compareSync(args.password, admin.password);
	if (!isMatch) throw new NotAuthenticated(notAuthenticated);

	const token = encodePayload(admin.id, 'adminId');

	const payload = _.omit(admin, SHOULD_OMIT_PROPS);

	return { token, payload };
};
