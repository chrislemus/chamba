import '../styles/bulma/bulma.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import PrivateRoute from '../components/PrivateRoute';
import Head from 'next/head';

import { useState } from 'react';
import Navbar from '../components/NavBars';
import AlertModal from '../components/AlertModal';
import MainLayout from '../layouts/Main';
import { Provider } from 'react-redux';
import store from '../store';

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  return (
    <div style={{ background: 'rgb(248, 248, 248)', minHeight: '100vh' }}>
      <Head>
        <title>Business CRM | Work It CRM</title>
        <meta
          name="description"
          content="Run your business like you mean business"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PrivateRoute>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </PrivateRoute>
        </Provider>
      </QueryClientProvider>
    </div>
  );
}
