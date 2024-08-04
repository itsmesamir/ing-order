import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import SignIn from 'pages/signin/SignIn';
import SignUp from 'pages/signup/SignUp';
import PageLayout from 'pages/layout/PageLayout';
import AdminOrders from 'pages/adminOrders/AdminOrders';
import Home from 'pages/home';
import Dashboard from 'pages/dashboard/Dashboard';
import OrderHistory from 'pages/orderHistory/OrderHistory';
import Feedback from 'pages/feedback/Feedback';

import AuthRoute from 'components/AuthRoute';

import { createRoute } from 'utils/route';

import paths from 'constants/paths';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <AuthRoute path={createRoute([paths.home])} component={Home} />

        <Route exact path={createRoute([paths.signin])} component={SignIn} />

        <Route exact path={createRoute([paths.signup])} component={SignUp} />

        <Route exact path={createRoute([paths.adminOrders])} component={AdminOrders} />

        <Route exact path={createRoute([paths.dashboard])} component={Dashboard} />

        <Route exact path={createRoute([paths.orders])} component={OrderHistory} />

        <Route exact path={createRoute([paths.feedbacks])} component={Feedback} />

        <Redirect to={createRoute([paths.home])} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
