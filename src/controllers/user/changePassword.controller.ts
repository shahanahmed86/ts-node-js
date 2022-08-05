import { compareSync, hashSync, Prisma, prisma } from '../../library';
import { LoginType } from '../../types/common.types';
import { Controller } from '../../types/wrapper.types';
import { ConflictError, NotAuthorized } from '../../utils/errors.utils';
import { includeDeleteParams, joiValidator } from '../../utils/logics.utils';
import { changePasswordSchema } from '../../validation';

type Args = {
	oldPassword: string;
	password: string;
};

export const changePassword: Controller<null, Args, string> = async (root, args, { req }) => {
	if (!req.userId) throw new NotAuthorized();

	await joiValidator(changePasswordSchema, args);

	const defaultLogin: LoginType = 'LOCAL';
	const userWhere: Prisma.UserWhereInput = includeDeleteParams({ defaultLogin });
	const where: Prisma.SignUpWhereInput = includeDeleteParams({
		type: defaultLogin,
		userId: req.userId,
		user: userWhere,
	});

	const signUp = await prisma.signUp.findFirst({ where });
	if (!signUp) throw new NotAuthorized();

	if (signUp.password) {
		const isMatch = compareSync(args.oldPassword, signUp.password);
		if (!isMatch) throw new ConflictError('Password mismatched');
	}

	const password = hashSync(args.password);
	await prisma.signUp.update({ where: { id: signUp.id }, data: { password } });

	return 'password changed successfully';
};
