import { prisma } from '../library';
import { ContextFunction, Controller } from '../types/wrapper.types';
import { graphqlCatch, restCatch } from './errors.utils';

export const restWrapper = (controller: any): ContextFunction => {
	return async (req, res, next) => {
		try {
			const root = null;
			const args = Object.assign({}, req.query, req.params, req.body);
			const context = { req, res, next };

			const result = await controller(root, args, context);

			res.status(200).send(result);
		} catch (e) {
			restCatch(e, req, res);
		} finally {
			if (prisma) await prisma.$disconnect();
		}
	};
};

export const graphqlWrapper = (controller: any): Controller<null, object, any> => {
	return async (...args) => {
		try {
			return await controller(...args);
		} catch (e) {
			graphqlCatch(e);
		} finally {
			if (prisma) await prisma.$disconnect();
		}
	};
};
