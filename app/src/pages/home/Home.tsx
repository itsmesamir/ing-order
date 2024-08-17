import { Redirect, Route, Switch } from 'react-router-dom';

import Feedback from 'pages/feedback/Feedback';
import Dashboard from 'pages/dashboard/Dashboard';
import UserOrders from 'pages/userOrders/UserOrders';
import OrderHistory from 'pages/orderHistory/OrderHistory';

import useUserStore from 'stores/useUserStore';

import DashboardLayout from 'components/DashboardLayout';

import { createRoute } from 'utils/route';

import paths from 'constants/paths';

import HomeComponent from './HomeComponent';

function Home() {
  const user = useUserStore(state => state.data);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <DashboardLayout bgColor="white">
      <Switch>
        <Route path={createRoute([paths.menus])} component={HomeComponent} />

        <Route exact path={createRoute([paths.dashboard])} component={Dashboard} />

        <Route exact path={createRoute([paths.userOrders])} component={UserOrders} />

        <Route exact path={createRoute([paths.orders])} component={OrderHistory} />

        <Route exact path={createRoute([paths.feedbacks])} component={Feedback} />

        <Redirect to={createRoute([paths.menus])} />
      </Switch>
    </DashboardLayout>
  );
}

export default Home;
