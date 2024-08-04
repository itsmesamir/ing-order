import { useEffect } from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

import SignIn from 'pages/signin/SignIn';
import SignUp from 'pages/signup/SignUp';
import PageLayout from 'pages/layout/PageLayout';
import DashboardDrawer from 'pages/dashboard/components/DashboardDrawer';

import useUserStore from 'stores/useUserStore';

import Home from 'components/Home';
import Toast from 'components/Toast';
import Router from 'components/Router';
import AuthRoute from 'components/AuthRoute';
import Header from 'components/common/header/Header';

import { createRoute } from 'utils/route';

import paths from 'constants/paths';

import './styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  const { loading, fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <div className="">
          <DashboardDrawer />

          <div>
            <Header />
            <Router />
          </div>
        </div>
        <Toast />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
