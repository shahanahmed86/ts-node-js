import { RequestHandler } from 'express';

export const notFound: RequestHandler = (req, res): void => {
	res.status(404).send('No Routes were found...');
};
