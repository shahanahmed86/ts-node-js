import { Router } from 'express';
import { adminController } from '../../../../controllers';
import { auth, guest } from '../../../../controllers/middleware/auth.middleware';
import { restWrapper } from '../../../../utils/wrapper.utils';

const router = Router();

router
	.route('/')
	.get(auth('adminId'), restWrapper(adminController.loggedIn))
	.post(guest, restWrapper(adminController.login))
	.put(auth('adminId'), restWrapper(adminController.changePassword));

export default router;
