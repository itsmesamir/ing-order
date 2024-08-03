import config from 'config/config';

const api = {
  baseUrl: config.apiBaseURI as string,
  basePath: '',
  signUp: '/users/signup',
  signIn: '/users/signin',
  currentUser: `/users/currentuser`,
  logout: `/users/logout`,
  designations: '/designations',
  roles: '/roles',
  users: '/users',
  countries: '/countries',
  leaveTypes: '/leave-types',
  leaveCredits: '/leave-credits',
  fiscalYears: '/fiscal-years',
  leaves: '/leaves',
  leaveRequests: '/leave-requests',
  updateLeaveStatus: '/leave-requests/:id/status',
  leave: '/leave',
  updateLeave: '/leave/:id',
  menus: '/menus',
  menuCategories: '/menus/categories',
  orders: '/orders',
};

export default api;
