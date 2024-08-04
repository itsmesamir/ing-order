import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import useUserStore from 'stores/useUserStore';

import { buildUrl } from 'utils/string';
import { createRoute } from 'utils/route';

import paths from 'constants/paths';

interface AuthRouteProps {
  exact?: boolean;
  path: string;
  children?: React.ReactNode;
}

function AuthRoute(props: AuthRouteProps) {
  const { exact = false, path, children } = props;

  const { data: user, loading } = useUserStore(state => state);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Redirect to={createRoute([paths.signin])} />;
  }

  return <Route exact={exact} path={path} render={() => children} />;
}

export default AuthRoute;
