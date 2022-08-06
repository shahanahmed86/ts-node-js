import { Router } from 'express';

import adminRoutes from './admin';
import userRoutes from './user';
import commonRoutes from './common';

const router = Router();

// common
router.use('/common', commonRoutes);

// dedicated
router.use('/admin', adminRoutes);
router.use('/user', userRoutes);
router.use('/user', userRoutes);

export default router;
