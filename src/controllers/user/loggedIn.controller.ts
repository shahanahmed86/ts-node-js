import { Prisma, prisma } from '../../library';
import { Controller } from '../../types/wrapper.types';
import { ConflictError, NotAuthorized } from '../../utils/errors.utils';
import { includeDeleteParams, omitProps } from '../../utils/logics.utils';

type Result = Prisma.SignUpWhereInput;

export const loggedIn: Controller<object, Result> = async (root, args, { req }) => {
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

	const payload: Result = omitProps(signUp);
	payload.user = omitProps(signUp.user);

	return payload;
};
