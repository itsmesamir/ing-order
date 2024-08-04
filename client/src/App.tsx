import { ChakraProvider, theme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';

import DashboardDrawer from 'pages/dashboard/components/DashboardDrawer';

import useUserStore from 'stores/useUserStore';

import Header from 'components/common/header/Header';
import Router from 'components/Router';
import Toast from 'components/Toast';

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
        <Router />
        <Toast />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
