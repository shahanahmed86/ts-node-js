import { Router } from 'express';
import { adminController } from '../../../../controllers';
import { restWrapper } from '../../../../utils/wrapper.utils';
import { auth, guest } from '../../../middleware/auth.middleware';

const router = Router();

router
	.route('/')
	.get(auth('adminId'), restWrapper(adminController.adminLoggedIn))
	.put(auth('adminId'), restWrapper(adminController.adminChangePassword))
	.post(guest, restWrapper(adminController.adminLogin));

export default router;
