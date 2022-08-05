import { authController, guestController } from '../../controllers/middleware/auth.controller';
import { KeyIds } from '../../types/common.types';
import { ContextFunction } from '../../types/wrapper.types';
import { restCatch } from '../../utils/errors.utils';

export const guest = (): ContextFunction => {
	return async (req, res, next) => {
		try {
			guestController(req);

			next();
		} catch (e) {
			restCatch(e, req, res);
		}
	};
};

export const auth = (key: KeyIds): ContextFunction => {
	return async (req, res, next) => {
		try {
			await authController(key, req);

			next();
		} catch (e) {
			restCatch(e, req, res);
		}
	};
};
