import { Layout } from '@/components/Layout';
import type { AppProps } from 'next/app';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query';
import { useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';

export const QueryClientWithConfig = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(QueryClientWithConfig);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
