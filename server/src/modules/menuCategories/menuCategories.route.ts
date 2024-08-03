import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as menuCategoriesController from './menuCategories.controller';

const router = Router();

// TODO: use requireAuth for other routes except this
router.get('/', menuCategoriesController.fetchMenuCategories);

export default router;
