import '../styles/bulma/bulma.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from '@material-ui/styles';
import PrivateRoute from '../components/PrivateRoute';
import Head from 'next/head';
import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import { useEffect } from 'react';
import store from '../store';
import theme from '../src/theme';

import '@fontsource/roboto';

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  return (
    <div style={{ background: 'rgb(248, 248, 248)', minHeight: '100vh' }}>
      <Head>
        <title>Business CRM | Work It CRM</title>
        <meta
          name="description"
          content="Run your business like you mean business"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PrivateRoute>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </PrivateRoute>
          </Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}
