import { prisma } from '../library';
import { ContextFunction } from '../types/wrapper.types';
import { convertUnknownIntoError } from './logics.utils';

export const restWrapper = (controller: any): ContextFunction => {
	return async (req, res, next) => {
		try {
			const root = null;
			const args = Object.assign({}, req.query, req.params, req.body);
			const context = { req, res, next };

			const result = await controller(root, args, context);

			res.status(200).send(result);
		} catch (e) {
			const error = convertUnknownIntoError(e);

			res.status(error.status).send(error.message);
		} finally {
			if (prisma) await prisma.$disconnect();
		}
	};
};
