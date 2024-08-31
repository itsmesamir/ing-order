import { Router } from 'express';

import { Roles } from '@/types/common';

import { requireAuth } from '@/middlewares/auth';
import { validateReqBody } from '@/middlewares/validator';
import { authorizeWithRoles } from '@/middlewares/authorizeWIthRoles';

import * as userController from './user.controller';
import * as userValidator from './user.validator';

const router = Router();

// TODO: use requireAuth
router.get('/', userController.fetchUsers);

router.get('/currentuser', userController.fetchCurrentUser);

router.get('/:id', requireAuth, userController.fetchUserById);

router.put(
  '/:id',
  validateReqBody(userValidator.updateUserSchema),
  requireAuth,
  authorizeWithRoles({
    roles: [Roles.ADMIN],
    isSelf: true,
    selfAccessor: 'id',
  }),
  userController.updateUserById
);

router.post('/signin', validateReqBody(userValidator.signInSchema), userController.signIn);

router.post('/signup', validateReqBody(userValidator.signUpSchema), userController.signUp);

router.post('/signout', userController.signOut);

// get user roles /users/:id/roles
router.get('/:id/roles', requireAuth, userController.fetchUserRoles);

// post user roles /users/:id/roles
router.post('/:id/roles', requireAuth, userController.upsertUserRoles);

export default router;
