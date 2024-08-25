import { Redirect, Route, Switch } from 'react-router-dom';

import AdminOrders from 'pages/adminOrders/AdminOrders';
import AdminMenuLists from 'pages/adminMenus/AdminMenuLists';
import AddMenuItems from 'pages/adminMenus/AddMenuItems';
import AdminCategories from 'pages/adminCategories/AdminCategories';
import AddCategories from 'pages/adminCategories/AddCategories';

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

        <Route exact path={createRoute([paths.addMenuItems])} component={AddMenuItems} />
        <Route exact path={createRoute([paths.editMenuItems])} component={AddMenuItems} />
        <Route exact path={createRoute([paths.adminMenus])} component={AdminMenuLists} />

        <Route exact path={createRoute([paths.categories])} component={AdminCategories} />
        <Route exact path={createRoute([paths.addCategories])} component={AddCategories} />

        <Redirect to={createRoute([paths.adminMenus])} />
      </Switch>
    </AdminLayout>
  );
}

export default Admin;
