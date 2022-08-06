import { Router } from 'express';
import { commonController } from '../../../../controllers';
import { restWrapper } from '../../../../utils/wrapper.utils';

const router = Router();

router
	.route('/')
	.get(restWrapper(commonController.getImage))
	.post(restWrapper(commonController.uploadImage))
	.delete(restWrapper(commonController.removeImage));

export default router;
