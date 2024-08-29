import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as menuCategoriesController from './menuCategories.controller';

const router = Router();

// TODO: use requireAuth for other routes except this
router.get('/', menuCategoriesController.fetchMenuCategories);
router.post('/', requireAuth, menuCategoriesController.createMenuCategory);
router.put('/:id', requireAuth, menuCategoriesController.updateMenuCategoryById);
router.delete('/:id', requireAuth, menuCategoriesController.deleteMenuCategoryById);

export default router;
