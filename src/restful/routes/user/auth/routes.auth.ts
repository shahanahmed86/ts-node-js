import { Router } from 'express';
import { userController } from '../../../../controllers';
import { restWrapper } from '../../../../utils/wrapper.utils';
import { auth, guest } from '../../../middleware/auth.middleware';

const router = Router();

router
	.route('/')
	.get(auth('userId'), restWrapper(userController.loggedIn))
	.put(auth('userId'), restWrapper(userController.changePassword))
	.post(guest, restWrapper(userController.login));

router.post('/register', guest, restWrapper(userController.register));

export default router;
