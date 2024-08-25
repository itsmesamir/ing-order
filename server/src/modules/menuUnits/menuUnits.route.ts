import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as menuUnitsController from './menuUnits.controller';

const router = Router();

// TODO: use requireAuth for other routes except this
router.get('/', menuUnitsController.fetchMenuUnits);

export default router;
