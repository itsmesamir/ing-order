import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as cafesController from './cafes.controller';

const router = Router();

// TODO: use requireAuth for other route expecct this
router.get('/', cafesController.fetchCafes);

export default router;
