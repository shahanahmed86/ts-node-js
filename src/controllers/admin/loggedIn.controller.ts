import { Prisma, prisma } from '../../library';
import { Controller } from '../../types/wrapper.types';
import { NotAuthorized } from '../../utils/errors.utils';
import { omitProps } from '../../utils/logics.utils';

type Result = Prisma.AdminWhereInput;

export const loggedIn: Controller<null, object, Result> = async (root, args, { req }) => {
	if (!req.adminId) throw new NotAuthorized();

	const admin = await prisma.admin.findFirst({ where: { id: req.adminId } });
	if (!admin) throw new NotAuthorized();

	const payload: Result = omitProps(admin);

	return payload;
};
