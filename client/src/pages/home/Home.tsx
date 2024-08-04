import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import DashboardDrawer from 'pages/dashboard/components/DashboardDrawer';
import PageLayout from 'pages/layout/PageLayout';

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
      {/* <DashboardDrawer /> */}
      <Header currentUser={user} />

      <Switch>
        <Route path={createRoute([paths.home, paths.menus])} component={PageLayout} />

        <Redirect to={createRoute([paths.home, paths.menus])} />
      </Switch>
    </div>
  );
}

export default Home;
