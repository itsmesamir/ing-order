// organization routes
import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as organizationsController from './organizations.controller';

const router = Router();

router.get('/', organizationsController.fetchOrganizations);
router.get('/:id', requireAuth, organizationsController.fetchOrganizationById);
router.post('/', requireAuth, organizationsController.createOrganization);
router.put('/:id', requireAuth, organizationsController.updateOrganizationById);
router.delete('/:id', requireAuth, organizationsController.deleteOrganizationById);

export default router;
