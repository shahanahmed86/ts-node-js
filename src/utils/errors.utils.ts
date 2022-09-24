import { ApolloError, AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server-core';
import { Response } from 'express';
import { GraphQLError } from 'graphql';
import { IRequest } from '../types/extends.types';
import { convertUnknownIntoError } from './logics.utils';

export class HttpError extends Error {
	public status!: number;
}

export class NotFound extends HttpError {
	constructor(message: string = 'not found') {
		super(message);
		this.status = 404;
	}
}

export class BadRequest extends HttpError {
	constructor(message: string = 'bad request') {
		super(message);
		this.status = 400;
	}
}

export class ConflictError extends HttpError {
	constructor(message: string = 'conflict error') {
		super(message);
		this.status = 409;
	}
}

export class NotAuthorized extends HttpError {
	constructor(message: string = 'not authorized') {
		super(message);
		this.status = 422;
	}
}

export class NotAuthenticated extends HttpError {
	constructor(message: string = 'not authenticated') {
		super(message);
		this.status = 401;
	}
}

export const graphqlCatch = (e: unknown): GraphQLError => {
	const error = convertUnknownIntoError(e);
	switch (error.status) {
		case 401: {
			return new AuthenticationError(error.message);
		}
		case 422:
		case 400: {
			return new ForbiddenError(error.message);
		}
		case 409: {
			return new UserInputError(error.message);
		}
		default: {
			return new ApolloError(error.message);
		}
	}
};

export const restCatch = (e: unknown, req: IRequest, res: Response): void => {
	const error = convertUnknownIntoError(e);

	req.error = error;
	res.status(error.status).send(error.message);
};
