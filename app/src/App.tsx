import { useEffect } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AppRouter from 'pages/AppRouter';

import useUserStore from 'stores/useUserStore';

import Toast from 'components/Toast';

import './styles.css';
import { colors } from './presets/ingPresets';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  const { loading, fetchUser } = useUserStore();

  const theme = extendTheme({
    colors,
    components: {
      FormError: {
        baseStyle: {
          text: {
            color: 'error-base',
            fontSize: 'xl',
          },
        },
      },
    },
  });

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <AppRouter />
        <Toast />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
