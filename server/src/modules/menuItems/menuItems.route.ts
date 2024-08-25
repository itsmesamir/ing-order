import { Router } from 'express';

import { validateReqBody } from '@/utils/validator';

import { requireAuth } from '@/middlewares/auth';

import * as menuItemsController from './menuItems.controller';
import * as menuItemsValidator from './menuItems.validator';

const router = Router();

// Public route to get all menu items
router.get('/', menuItemsController.fetchMenuItems);

// Authenticated routes for specific menu item operations
router.get('/:id', menuItemsController.fetchMenuItemById);
router.post(
  '/',
  requireAuth,
  validateReqBody(menuItemsValidator.createMenuItemSchema),
  menuItemsController.createMenuItem
);
router.put('/:id', requireAuth, menuItemsController.updateMenuItemById);
router.delete('/:id', requireAuth, menuItemsController.deleteMenuItemById);

export default router;
