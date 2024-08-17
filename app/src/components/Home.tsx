import { Redirect, Route, Switch } from 'react-router-dom';

import Dashboard from 'pages/dashboard/Dashboard';
import Leave from 'pages/leave/Leave';
import AppyLeave from 'pages/leave/AppyLeave';
import Profile from 'pages/profile/Profile';
import Employee from 'pages/employee/Employee';
import LeaveBalance from 'pages/leave/LeaveBalance';

import { createRoute } from 'utils/route';

import { Roles } from 'types/common';

import paths from 'constants/paths';
import routes from 'constants/routes';

import ProtectedRoute from './ProtectedRoute';

function Home() {
  return (
    <Switch>
      <ProtectedRoute
        exact
        path={routes.home}
        component={Dashboard}
        requiredRoles={[Roles.ADMIN]}
      />

      <Route exact path={routes.leave} component={Leave} />

      <Route exact path={routes.applyleave} component={AppyLeave} />

      <Route exact path={routes.profile} component={Profile} />

      <Route exact path={routes.userProfile} component={Profile} />

      <ProtectedRoute
        exact
        path={routes.employee}
        component={Employee}
        requiredRoles={[Roles.ADMIN]}
      />

      <Route exact path={routes.leavebalance} component={LeaveBalance} />

      <Redirect to={createRoute([paths.home])} />
    </Switch>
  );
}

export default Home;
