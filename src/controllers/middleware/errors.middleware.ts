import { Response } from 'express';
import { IRequest } from '../../types/extends.types';
import { NotFound } from '../../utils/errors.utils';

export const notFound: any = (req: IRequest, res: Response): void => {
	const error = new NotFound('No Routes were found...');
	req.error = error;
	res.status(error.status).send(error.message);
};
