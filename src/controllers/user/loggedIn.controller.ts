import _ from 'lodash';
import { Prisma, prisma } from '../../library';
import { Controller } from '../../types/wrapper.types';
import { SHOULD_OMIT_PROPS } from '../../utils/constants.utils';
import { NotAuthorized } from '../../utils/errors.utils';

interface Args {
	token: string;
}

export const loggedIn: Controller<Args, object> = async (root, args, { req }) => {
	const userWhereInput: Prisma.UserWhereInput = { id: req.userId };
	const user = await prisma.user.findFirst({ where: userWhereInput });
	if (!user) throw new NotAuthorized();

	const signUpWhereInput: Prisma.SignUpWhereInput = { userId: user.id, type: user.defaultLogin };
	const signUp = await prisma.signUp.findFirst({ where: signUpWhereInput });
	if (!signUp) throw new NotAuthorized();

	const payload = _.omit(signUp, SHOULD_OMIT_PROPS);

	return payload;
};
