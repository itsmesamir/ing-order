import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as groupsController from './groups.controller';

const router = Router();

// Public route to get all groups
router.get('/', requireAuth, groupsController.fetchGroups);

// Authenticated routes for specific group operations
router.get('/:id', requireAuth, groupsController.fetchGroupById);
router.post('/', requireAuth, groupsController.createGroup);
router.put('/:id', requireAuth, groupsController.updateGroupById);
router.delete('/:id', requireAuth, groupsController.deleteGroupById);

export default router;
