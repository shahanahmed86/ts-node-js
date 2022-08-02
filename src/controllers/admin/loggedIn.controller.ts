import _ from 'lodash';
import { Prisma, prisma } from '../../library';
import { Controller } from '../../types/wrapper.types';
import { NotAuthorized } from '../../utils/errors.utils';

interface Args {
	token: string;
}

type Response = Omit<Prisma.AdminCreateInput, 'password'>;

export const loggedIn: Controller<Args, Response> = async (root, args, { req }) => {
	const admin = await prisma.admin.findFirst({ where: { id: req.userId } });
	if (!admin) throw new NotAuthorized();

	const payload = _.omit(admin, ['password']);

	return payload;
};
