import React from 'react';
import DefaultNavbar from '../components/NavBars/DefaultNavbar';
import SidePanel from '../components/SidePanel';
import { Layout } from 'antd';
import { connect } from 'react-redux';
const { Footer, Content } = Layout;

function MainLayout(props) {
  console.log(props.account);
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <DefaultNavbar />
      <Layout className="site-layout">
        <SidePanel />
        <Layout className="site-layout">
          <Content style={{ margin: '0 16px' }}>{props.children}</Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return { ...state };
};

export default connect(mapStateToProps)(MainLayout);
