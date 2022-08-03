import { decodePayload } from '../../library';
import { KeyIds } from '../../types/common.types';
import { IRequest } from '../../types/extends.types';
import { ContextFunction } from '../../types/wrapper.types';
import { BadRequest, NotAuthenticated, NotAuthorized } from '../../utils/errors.utils';
import { convertUnknownIntoError } from '../../utils/logics.utils';

type HasToken = (req: IRequest) => string | undefined;
type ValidateToken = (req: IRequest, token: string, key: KeyIds) => Promise<void>;

const invalidSession: string = 'no session or invalid...';

const hasToken: HasToken = (req) => req.headers.authorization;

const validateToken: ValidateToken = async (req, tokenValue, key) => {
	if (!tokenValue.includes('Bearer ')) throw new NotAuthenticated(invalidSession);

	const [, token] = tokenValue.split(' ');

	const payload = await decodePayload(token);
	if (!payload || !(key in payload) || !('exp' in payload)) {
		throw new NotAuthenticated(invalidSession);
	}

	req[key] = payload[key];
};

export const guest: ContextFunction = (req, res, next) => {
	try {
		const token = hasToken(req);
		if (token) throw new BadRequest('You are already logged in...');

		next();
	} catch (e) {
		const error = convertUnknownIntoError(e);

		req.error = error;
		res.status(error.status).send(error.message);
	}
};

export const auth = (key: KeyIds): ContextFunction => {
	return async (req, res, next) => {
		try {
			const token = hasToken(req);
			if (!token) throw new NotAuthorized('You must be logged in...');

			await validateToken(req, token, key);

			next();
		} catch (e) {
			const error = convertUnknownIntoError(e);

			req.error = error;
			res.status(error.status).send(error.message);
		}
	};
};
