import { Prisma, prisma } from '../../../library';
import { Controller } from '../../../types/wrapper.types';
import { NotFound } from '../../../utils/errors.utils';
import { includeDeleteParams } from '../../../utils/logics.utils';

type Controllers = {
	signUps: Controller<Prisma.AdminWhereInput, object, Prisma.SignUpWhereInput[]>;
};

const Admin: Controllers = {
	signUps: async (root) => {
		try {
			const id = root.id;
			if (!id) throw new NotFound('Please provide ID to get signUps');

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
