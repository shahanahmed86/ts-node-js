import { Router } from 'express';
import { middleware, userController } from '../../../../controllers';
import { restWrapper } from '../../../../utils';

const router = Router();

router.route('/').post(middleware.guest, restWrapper(userController.login));

export default router;
