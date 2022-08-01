import { Router } from 'express';
import { adminController, middleware } from '../../../../controllers';
import { restWrapper } from '../../../../utils';

const router = Router();

router
	.route('/')
	.get(middleware.auth('adminId'), restWrapper(adminController.loggedIn))
	.post(middleware.guest, restWrapper(adminController.login));

export default router;
