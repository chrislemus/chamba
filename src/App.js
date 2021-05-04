import './styles/App.css';
import './styles/bulma/bulma.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';
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

export default function App() {
  return (
    <ConnectedRouter history={history}>
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
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </MainLayout>
    </ConnectedRouter>
  );
}
