import { Router } from 'express';
import { userController } from '../../../../controllers';
import { restWrapper } from '../../../../utils/wrapper.utils';
import { auth, guest } from '../../../middleware/auth.middleware';

const router = Router();

router
	.route('/')
	.get(auth('userId'), restWrapper(userController.userLoggedIn))
	.put(auth('userId'), restWrapper(userController.userChangePassword))
	.post(guest, restWrapper(userController.userLogin));

router.post('/signup', guest, restWrapper(userController.userSignUp));

export default router;
