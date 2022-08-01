import { Router } from 'express';

import adminRoutes from './admin';

const router = Router();

router.use('/admin', adminRoutes);

export default router;
