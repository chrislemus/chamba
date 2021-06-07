import '../styles/bulma/bulma.min.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import PrivateRoute from '../components/PrivateRoute';
import Head from 'next/head';
import MainLayout from '../layouts/Main';
import { Provider } from 'react-redux';
import store from '../store';
import '@fontsource/roboto';

const theme = createMuiTheme({
  error: {
    main: 'red',
  },
});
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
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PrivateRoute>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </PrivateRoute>
          </Provider>
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  );
}
