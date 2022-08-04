import { authController, guestController } from '../../controllers/middleware/auth.controller';
import { KeyIds } from '../../types/common.types';
import { ContextFunction } from '../../types/wrapper.types';
import { convertUnknownIntoError } from '../../utils/logics.utils';

export const guest: ContextFunction = (req, res, next) => {
	try {
		guestController(req);

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
			await authController(key, req);

			next();
		} catch (e) {
			const error = convertUnknownIntoError(e);

			req.error = error;
			res.status(error.status).send(error.message);
		}
	};
};
