import { Router } from 'express';

import imageRoutes from './image/routes.image';
import genderRoutes from './gender/routes.gender';

const router = Router();

router.use('/image', imageRoutes);
router.use('/gender', genderRoutes);

export default router;
