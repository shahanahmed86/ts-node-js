import { NextFunction, Response } from 'express';
import { IRequest } from '../../types/extends.types';
import { NotFound } from '../../utils/errors.utils';

export const notFound = (req: IRequest, res: Response, next: NextFunction) => {
	if (req.path === '/graphql') return next();

	const error = new NotFound('No Routes were found');

	req.error = error;
	res.status(error.status).send(error.message);
};
