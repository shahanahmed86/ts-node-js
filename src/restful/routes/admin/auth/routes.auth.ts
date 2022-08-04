import { Router } from 'express';
import { adminController } from '../../../../controllers';
import { restWrapper } from '../../../../utils/wrapper.utils';
import { auth, guest } from '../../../middleware/auth.middleware';

const router = Router();

router
	.route('/')
	.get(auth('adminId'), restWrapper(adminController.loggedIn))
	.put(auth('adminId'), restWrapper(adminController.changePassword))
	.post(guest, restWrapper(adminController.login));

export default router;
