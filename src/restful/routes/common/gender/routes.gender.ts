import { Router } from 'express';
import { commonController } from '../../../../controllers';
import { restWrapper } from '../../../../utils/wrapper.utils';

const router = Router();

router.get('/', restWrapper(commonController.getGenderOptions));

export default router;
