import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as menuItemsController from './menuItems.controller';

const router = Router();

// Public route to get all menu items
router.get('/', menuItemsController.fetchMenuItems);

// Authenticated routes for specific menu item operations
router.get('/:id', menuItemsController.fetchMenuItemById);
router.post('/', requireAuth, menuItemsController.createMenuItem);
router.put('/:id', requireAuth, menuItemsController.updateMenuItemById);
router.delete('/:id', requireAuth, menuItemsController.deleteMenuItemById);

export default router;
