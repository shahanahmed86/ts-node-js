import { Admin } from '@prisma/client';
import { prisma } from '../../library';
import { Controller } from '../../types/wrapper.types';
import { NotAuthorized } from '../../utils/errors.utils';
import { omitProps } from '../../utils/logics.utils';

type Result = Partial<Admin>;

export const adminLoggedIn: Controller<null, object, Result> = async (root, args, { req }) => {
	if (!req.adminId) throw new NotAuthorized();

	const admin = await prisma.admin.findFirst({ where: { id: req.adminId } });
	if (!admin) throw new NotAuthorized();

	return omitProps(admin);
};
