import { Prisma } from '@prisma/client';
import { prisma } from '../../library';
import { _SignUp } from '../../types/extends.types';
import { Controller } from '../../types/wrapper.types';
import { ConflictError, NotAuthorized } from '../../utils/errors.utils';
import { includeDeleteParams, omitProps } from '../../utils/logics.utils';

type Result = Partial<_SignUp>;

export const userLoggedIn: Controller<null, object, Result> = async (root, args, { req }) => {
	if (!req.userId) throw new NotAuthorized();

	const userWhereInput: Prisma.UserWhereInput = { id: req.userId };
	const user = await prisma.user.findFirst({ where: userWhereInput });
	if (!user) throw new NotAuthorized();

	const signUpWhereInput: Prisma.SignUpWhereInput = includeDeleteParams({
		userId: user.id,
		type: user.defaultLogin,
	});
	const signUp = await prisma.signUp.findFirst({
		where: signUpWhereInput,
		include: { user: true },
	});
	if (!signUp) {
		throw new ConflictError(`You can login with ${user.defaultLogin.toLowerCase()} credentials`);
	}

	return omitProps(signUp);
};
