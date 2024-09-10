import { Redirect, Route, Switch } from 'react-router-dom';

import AdminOrders from 'pages/adminOrders/AdminOrders';
import AdminMenuLists from 'pages/adminMenus/AdminMenuLists';
import AddMenuItems from 'pages/adminMenus/AddMenuItems';
import AdminCategories from 'pages/adminCategories/AdminCategories';
import AdminUnits from 'pages/adminMenuUnits/AdminMenuUnits';
import AddEditCategories from 'pages/adminCategories/AddEditCategories';
import AddEditUnits from 'pages/adminMenuUnits/AddEditMenuUnits';

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
        <Route exact path={createRoute([paths.addCategories])} component={AddEditCategories} />
        <Route exact path={createRoute([paths.editCategories])} component={AddEditCategories} />

        <Route exact path={createRoute([paths.units])} component={AdminUnits} />
        <Route exact path={createRoute([paths.addUnits])} component={AddEditUnits} />
        <Route exact path={createRoute([paths.editUnits])} component={AddEditUnits} />

        <Redirect to={createRoute([paths.adminMenus])} />
      </Switch>
    </AdminLayout>
  );
}

export default Admin;
