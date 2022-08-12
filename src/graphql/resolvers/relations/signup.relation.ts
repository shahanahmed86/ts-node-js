import { Prisma, prisma } from '../../../library';
import { Controller } from '../../../types/wrapper.types';
import { NotFound } from '../../../utils/errors.utils';
import { includeDeleteParams } from '../../../utils/logics.utils';

type Controllers = {
	user: Controller<Prisma.SignUpWhereInput, object, null | Prisma.UserWhereInput>;
};

const SignUp: Controllers = {
	user: async (root) => {
		try {
			const id = root.id;
			if (!id) throw new NotFound('Please provide ID to get user');

			return await prisma.signUp.findFirstOrThrow({ where: includeDeleteParams({ id }) }).user();
		} catch (error) {
			console.log('signUp.user catch error....', error);
			return null;
		}
	},
};

export default SignUp;
