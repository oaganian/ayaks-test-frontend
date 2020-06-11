import React from 'react';
import './App.css';
import AllContainer from './components/All/AllContainer';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import AppSiderContainer from './components/Sider/SiderContainer';
import NewContainer from './components/New/NewContainer';
const { Header, Footer } = Layout;

const App = (props) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AppSiderContainer />
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0, background: 'white' }} />
        <Route exact path='/' render={() => <AllContainer />} />
        <Route path='/new' render={() => <NewContainer />} />
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}

export default App;
