import { Layout } from '@/components/Layout';
import { theme } from '@/config/theme';
import { CssBaseline } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  console.log('asdasd', process.env.NEXT_PUBLIC_API_URL);
  console.log('222', process.env.NEXT_PUBLIC_CLIENT_ID);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CssBaseline>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
