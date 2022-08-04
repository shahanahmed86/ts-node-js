import { Response, NextFunction } from 'express';
import { IRequest } from './extends.types';

export type ContextObject = {
	req: IRequest;
	res: Response;
	next: NextFunction;
};

export type Controller<T, S> = (root: object | null, args: T, context: ContextObject) => Promise<S>;

export type ContextFunction = (
	req: IRequest,
	res: Response,
	next: NextFunction,
) => void | Promise<void>;
