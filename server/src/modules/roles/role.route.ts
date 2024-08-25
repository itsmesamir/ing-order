import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as roleController from './role.controller';

const router = Router();

// TODO: use requireAuth
router.get('/', requireAuth, roleController.getRoles);

router.get('/:id', requireAuth, roleController.getRole);

router.post('/', requireAuth, roleController.createRole);

router.put('/:id', requireAuth, roleController.updateRole);

router.delete('/:id', requireAuth, roleController.deleteRole);

export default router;
