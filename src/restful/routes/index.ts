import os from 'os';
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

// healthcheck
router.get('/healthcheck', (_req, res) => {
	res.status(200).send(`I am happy and healthy, from host ${os.hostname()}!\n`);
});

export default router;
