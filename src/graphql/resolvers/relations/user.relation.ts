import { Prisma, prisma } from '../../../library';
import { Controller } from '../../../types/wrapper.types';
import { includeDeleteParams } from '../../../utils/logics.utils';

type Controllers = {
	signUps: Controller<Prisma.UserWhereInput, object, Prisma.SignUpWhereInput[]>;
};

const User: Controllers = {
	signUps: async (root) => {
		try {
			const id = root.id;
			if (!id) return [];

			return await prisma.user
				.findFirstOrThrow({ where: { id } })
				.signUps({ where: includeDeleteParams({}) });
		} catch (error) {
			console.log('user.signUps catch error....', error);
			return [];
		}
	},
};

export default User;
