import { prisma } from '../library';
import { ContextFunction } from '../types/wrapper.types';
import { restCatch } from './errors.utils';

export const restWrapper = (controller: CallableFunction): ContextFunction => {
	return async (req, res, next) => {
		try {
			const root = null;
			const args = Object.assign({}, req.params, req.query, req.body);
			const context = { req, res, next };

			const result = await controller(root, args, context);

			if (typeof result === 'string' && result.includes('/')) res.status(200).download(result);
			else res.status(200).send(result);
		} catch (e) {
			restCatch(e, req, res);
		} finally {
			if (prisma) await prisma.$disconnect();
		}
	};
};
