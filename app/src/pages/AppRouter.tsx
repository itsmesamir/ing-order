import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Home from 'pages/home';
import SignIn from 'pages/signin/SignIn';
import SignUp from 'pages/signup/SignUp';

import AuthRoute from 'components/AuthRoute';

import { createRoute } from 'utils/route';

import paths from 'constants/paths';

import Admin from './admin/Admin';

function AppRouter() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={createRoute([paths.signin])} component={SignIn} />

        <Route exact path={createRoute([paths.signup])} component={SignUp} />

        <AuthRoute path={createRoute([paths.admin])} component={Admin} />

        <AuthRoute path={createRoute([])} component={Home} />

        <Redirect to={createRoute([])} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRouter;
