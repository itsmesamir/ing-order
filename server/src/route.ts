import { Router } from 'express';

import swaggerRoute from '@/modules/swagger/swagger.route';
import usersRoute from '@/modules/user/user.route';
import rolesRoute from '@/modules/roles/role.route';
import designationsRoute from '@/modules/designations/designation.route';
import leaveTypesRoute from '@/modules/leaveTypes/leaveType.route';
import leaveCreditsRoute from '@/modules/leaveCredits/leaveCredit.route';
import leaveRequestsRoute from '@/modules/leaveRequests/leaveRequest.route';
import countriesRoute from '@/modules/countries/countries.route';
import fiscalYearsRoute from '@/modules/fiscalYears/fiscalYears.route';
import menuCategoriesRoute from '@/modules/menuCategories/menuCategories.route';
import ordersRoute from '@/modules/orders/orders.route';
import menuItemsRoute from '@/modules/menuItems/menuItems.route';

import { addToStore } from '@/services/store';

import config from 'config';
import { X_REQUEST_ID, X_TRACE_ID } from 'constants/headers';
import authMiddleware, { requireAuth } from 'middlewares/auth';

const router = Router();

router.get('/', (req, res) => {
  res.cookie('cookieName', 'cookieValue', { httpOnly: false });

  res.json({
    app: config.app.name,
    version: config.app.version,
  });
});

// Add request id and trace id to store.
router.use((req, _, next) => {
  if (req.headers[X_REQUEST_ID]) {
    addToStore({ [X_REQUEST_ID]: req.headers[X_REQUEST_ID] });
  }

  if (req.headers[X_TRACE_ID]) {
    addToStore({ [X_TRACE_ID]: req.headers[X_TRACE_ID] });
  }

  next();
});

router.use(authMiddleware);

router.use('/users', usersRoute);
router.use('/roles', rolesRoute);
router.use('/countries', countriesRoute);
router.use('/designations', designationsRoute);
router.use('/leave-types', leaveTypesRoute);
router.use('/leave-credits', leaveCreditsRoute);
router.use('/leave-requests', leaveRequestsRoute);
router.use('/fiscal-years', fiscalYearsRoute);
router.use('/menus/categories', menuCategoriesRoute);
router.use('/menus', menuItemsRoute);
router.use('/orders', ordersRoute);
router.use('/fiscal-years', fiscalYearsRoute);
router.use('/fiscal-years', fiscalYearsRoute);
router.use('/fiscal-years', fiscalYearsRoute);
router.use('/fiscal-years', fiscalYearsRoute);

router.use(requireAuth);
router.use('/api-docs', swaggerRoute);

export default router;
