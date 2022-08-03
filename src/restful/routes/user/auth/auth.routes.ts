import { Router } from 'express';
import { userController } from '../../../../controllers';
import { auth, guest } from '../../../../controllers/middleware/auth.middleware';
import { restWrapper } from '../../../../utils/wrapper.utils';

const router = Router();

router
	.route('/')
	.get(auth('userId'), restWrapper(userController.loggedIn))
	.put(auth('userId'), restWrapper(userController.changePassword))
	.post(guest, restWrapper(userController.login));

router.post('/register', guest, restWrapper(userController.signUp));

export default router;
