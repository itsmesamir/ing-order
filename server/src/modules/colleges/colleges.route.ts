import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as collegesController from './colleges.controller';

const router = Router();

// Public route to get all colleges
router.get('/', requireAuth, collegesController.fetchColleges);

// Authenticated routes for specific college operations
router.get('/:id', requireAuth, collegesController.fetchCollegeById);
router.post('/', requireAuth, collegesController.createCollege);
router.put('/:id', requireAuth, collegesController.updateCollegeById);
router.delete('/:id', requireAuth, collegesController.deleteCollegeById);

export default router;
