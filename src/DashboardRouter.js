// import './styles/App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/Home';
import SidePanel from './components/SidePanel';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;
import Main from './Dashboard/Overview';

function App() {
  return (
    <Router>
      <Content style={{ margin: '0 16px' }}>
        <Main />
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Router>
  );
}
