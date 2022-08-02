import { Router } from 'express';
import { userController } from '../../../../controllers';
import { guest } from '../../../../controllers/middleware/auth.middleware';
import { restWrapper } from '../../../../utils/wrapper.utils';

const router = Router();

router.route('/').post(guest, restWrapper(userController.login));

export default router;
