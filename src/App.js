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
import Clients from './pages/Clients/Index';
import CreateClient from './pages/Clients/CreateClient';

export default function App() {
  return (
    <ConnectedRouter history={history}>
      <MainLayout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PrivateRoute exact path="/overview" component={Overview} />
          <PrivateRoute exact path="/clients" component={Clients} />
          <PrivateRoute exact path="/clients/new" component={CreateClient} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </MainLayout>
    </ConnectedRouter>
  );
}
