import './styles/App.css';
import './styles/bulma/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Switch } from 'react-router';

import { ConnectedRouter } from 'connected-react-router';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './Layout/MainLayout';

import HomePage from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Overview from './pages/Overview';
import Customers from './pages/customer/Customers';
import NewCustomer from './pages/customer/NewCustomer';
import CustomerDetails from './pages/customer/CustomerDetails';
import EditCustomer from './pages/customer/EditCustomer.js';
import Invoices from './pages/invoices/Invoices';
import InvoiceDetails from './pages/invoices/InvoiceDetails'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

export default function App({ history }) {
  const queryClient = new QueryClient();

  return (
    <ConnectedRouter history={history}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <MainLayout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <PrivateRoute exact path="/overview" component={Overview} />
            <PrivateRoute exact path="/customers" component={Customers} />
            <PrivateRoute exact path="/customers/new" component={NewCustomer} />
            <PrivateRoute
              exact
              path="/customers/:id"
              component={CustomerDetails}
            />
            <PrivateRoute
              exact
              path="/customers/:id/edit"
              component={EditCustomer}
            />
            <PrivateRoute exact path="/invoices" component={Invoices} />
            <PrivateRoute
              exact
              path="/invoices/:id"
              component={InvoiceDetails}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </MainLayout>
      </QueryClientProvider>
    </ConnectedRouter>
  );
}
