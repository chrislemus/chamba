import './styles/App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/Home';
import SidePanel from './components/SidePanel';
import { Layout } from 'antd';
import Overview from './Dashboard/Overview';

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <Router>
      {/* <div> */}

      <Layout style={{ minHeight: '100vh' }}>
        {/* <Header> */}
        <NavBar />
        {/* </Header> */}
        <Layout className="site-layout">
          <SidePanel />
          <Layout className="site-layout">
            <Content style={{ margin: '0 16px' }}>
              <Route exact path="/" component={Overview} />
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                Bill is a cat.
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Layout>
      {/* </div> */}
    </Router>
  );
}

export default App;
