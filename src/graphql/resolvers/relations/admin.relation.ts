import { Prisma, prisma } from '../../../library';
import { Controller } from '../../../types/wrapper.types';
import { includeDeleteParams } from '../../../utils/logics.utils';

type Controllers = {
	signUps: Controller<Prisma.AdminWhereInput, object, Prisma.SignUpWhereInput[]>;
};

const Admin: Controllers = {
	signUps: async (root) => {
		try {
			const id = root.id;
			if (!id) return [];

			return await prisma.admin
				.findFirstOrThrow({ where: { id } })
				.signUps({ where: includeDeleteParams({}) });
		} catch (error) {
			console.log('admin.signUps catch error....', error);
			return [];
		}
	},
};

export default Admin;
