import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Home from 'pages/home';
import SignIn from 'pages/signin/SignIn';
import SignUp from 'pages/signup/SignUp';

import AuthRoute from 'components/AuthRoute';

import { createRoute } from 'utils/route';

import paths from 'constants/paths';

import DashboardLayout from './DashboardLayout';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path={createRoute([])} component={Home} />

        <Route exact path={createRoute([paths.signin])} component={SignIn} />

        <Route exact path={createRoute([paths.signup])} component={SignUp} />

        <Redirect to={createRoute([])} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
