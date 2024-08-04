import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SignIn from 'pages/signin/SignIn';
import SignUp from 'pages/signup/SignUp';
import PageLayout from 'pages/layout/PageLayout';
import AdminOrders from 'pages/adminOrders/AdminOrders';

import Home from 'components/Home';
import AuthRoute from 'components/AuthRoute';

import { createRoute } from 'utils/route';

import paths from 'constants/paths';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={createRoute([paths.signin])} component={SignIn} />

        <Route exact path={createRoute([paths.signup])} component={SignUp} />

        <AuthRoute path="/">
          <Route path={createRoute([paths.menus])} component={PageLayout} />

          <Route exact path={createRoute([paths.adminOrders])} component={AdminOrders} />

          <Route path={createRoute(['/home'])} component={Home} />
        </AuthRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
