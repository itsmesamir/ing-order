import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Feedback from 'pages/feedback/Feedback';
import PageLayout from 'pages/layout/PageLayout';
import Dashboard from 'pages/dashboard/Dashboard';
import UserOrders from 'pages/userOrders/UserOrders';
import AdminOrders from 'pages/adminOrders/AdminOrders';
import OrderHistory from 'pages/orderHistory/OrderHistory';

import useUserStore from 'stores/useUserStore';

import Header from 'components/common/header/Header';

import { createRoute } from 'utils/route';

import paths from 'constants/paths';

function Home() {
  const user = useUserStore(state => state.data);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header currentUser={user} />

      <Switch>
        <Route path={createRoute([paths.menus])} component={PageLayout} />

        <Route exact path={createRoute([paths.adminOrders])} component={AdminOrders} />

        <Route exact path={createRoute([paths.dashboard])} component={Dashboard} />

        <Route exact path={createRoute([paths.userOrders])} component={UserOrders} />

        <Route exact path={createRoute([paths.orders])} component={OrderHistory} />

        <Route exact path={createRoute([paths.feedbacks])} component={Feedback} />

        <Redirect to={createRoute([paths.menus])} />
      </Switch>
    </div>
  );
}

export default Home;
