// events route
import { Router } from 'express';

import { requireAuth } from '@/middlewares/auth';

import * as eventsController from './events.controller';

const router = Router();

router.get('/', eventsController.fetchEvents);
router.get('/:id', requireAuth, eventsController.fetchEventById);
router.post('/', requireAuth, eventsController.createEvent);
router.put('/:id', requireAuth, eventsController.updateEventById);
router.delete('/:id', requireAuth, eventsController.deleteEventById);

export default router;
