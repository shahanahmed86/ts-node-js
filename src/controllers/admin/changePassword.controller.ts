import { compareSync, hashSync, prisma } from '../../library';
import { Controller } from '../../types/wrapper.types';
import { ConflictError, NotAuthorized } from '../../utils/errors.utils';
import { joiValidator } from '../../utils/logics.utils';
import { changePasswordSchema } from '../../validation';

interface Args {
	oldPassword: string;
	password: string;
}

export const changePassword: Controller<Args, string> = async (root, args, { req }) => {
	await joiValidator(changePasswordSchema, args);

	if (args.oldPassword === args.password) {
		throw new ConflictError('Old and new passwords are same...');
	}

	const admin = await prisma.admin.findFirst({ where: { id: req.userId } });
	if (!admin) throw new NotAuthorized();

	const isMatch = compareSync(args.oldPassword, admin.password);
	if (!isMatch) throw new ConflictError('Old password mismatched...');

	const password = hashSync(args.password);
	await prisma.admin.update({ where: { id: admin.id }, data: { password } });

	return 'Password changed successfully';
};
