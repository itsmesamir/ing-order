import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as cafesController from './cafes.controller';

const router = Router();

router.get('/', cafesController.fetchCafes);
router.get('/:id', cafesController.fetchCafeById);
router.post('/', requireAuth, cafesController.createCafe);
router.put('/:id', requireAuth, cafesController.updateCafe);
router.delete('/:id', requireAuth, cafesController.deleteCafe);

export default router;
