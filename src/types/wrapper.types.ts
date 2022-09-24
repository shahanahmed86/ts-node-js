import { Response, NextFunction } from 'express';
import { GraphQLResolveInfo } from 'graphql';
import { IRequest } from './extends.types';

export type ContextObject = {
	req: IRequest;
	res: Response;
	next: NextFunction;
};

export type Controller<R, A, C> = (
	root: R,
	args: A,
	context: ContextObject,
	info?: GraphQLResolveInfo,
) => C | Promise<C>;

export type ContextFunction = (req: IRequest, res: Response, next: NextFunction) => void | Promise<void>;
