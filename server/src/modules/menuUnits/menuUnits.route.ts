import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as menuUnitsController from './menuUnits.controller';

const router = Router();

// TODO: use requireAuth for other routes except this
router.get('/', menuUnitsController.fetchMenuUnits);
router.post('/', requireAuth, menuUnitsController.createMenuUnit);
router.put('/:id', requireAuth, menuUnitsController.updateMenuUnitById);
router.delete('/:id', requireAuth, menuUnitsController.deleteMenuUnitById);

export default router;
