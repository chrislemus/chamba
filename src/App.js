import './styles/App.css';
import './styles/bulma/bulma.min.css';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './store';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Overview from './pages/Overview';
import MainLayout from './Layout/MainLayout';

export default function App() {
  return (
    <ConnectedRouter history={history}>
      <MainLayout>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <PrivateRoute exact path="/overview" component={Overview} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </MainLayout>
    </ConnectedRouter>
  );
}
