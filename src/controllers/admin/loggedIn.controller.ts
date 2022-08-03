import _ from 'lodash';
import { prisma } from '../../library';
import { Controller } from '../../types/wrapper.types';
import { SHOULD_OMIT_PROPS } from '../../utils/constants.utils';
import { NotAuthorized } from '../../utils/errors.utils';

interface Args {
	token: string;
}

export const loggedIn: Controller<Args, object> = async (root, args, { req }) => {
	const admin = await prisma.admin.findFirst({ where: { id: req.userId } });
	if (!admin) throw new NotAuthorized();

	const payload = _.omit(admin, SHOULD_OMIT_PROPS);

	return payload;
};
