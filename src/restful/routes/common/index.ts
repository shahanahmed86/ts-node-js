import { Router } from 'express';

import imageRoutes from './image/routes.image';

const router = Router();

router.use('/image', imageRoutes);

export default router;
