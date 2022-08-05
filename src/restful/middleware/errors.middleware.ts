import { NextFunction, Response } from 'express';
import { IRequest } from '../../types/extends.types';
import { NotFound, restCatch } from '../../utils/errors.utils';

export const notFound = (req: IRequest, res: Response, next: NextFunction) => {
	if (req.path === '/graphql') return next();

	const e = new NotFound('No Routes were found');
	restCatch(e, req, res);
};
