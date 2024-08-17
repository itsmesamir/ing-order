import { Redirect, Route, Switch } from 'react-router-dom';

import AdminOrders from 'pages/adminOrders/AdminOrders';
import AdminMenus from 'pages/adminMenus/AdminMenu';

import useUserStore from 'stores/useUserStore';

import { createRoute } from 'utils/route';

import paths from 'constants/paths';

import AdminLayout from './AdminLayout';

function Admin() {
  const user = useUserStore(state => state.data);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout bgColor="white">
      <Switch>
        <Route exact path={createRoute([paths.adminOrders])} component={AdminOrders} />

        <Route exact path={createRoute([paths.adminMenus])} component={AdminMenus} />

        <Redirect to={createRoute([paths.adminMenus])} />
      </Switch>
    </AdminLayout>
  );
}

export default Admin;
