import React from 'react';
import PropTypes from 'prop-types';

import {
  UnorderedListOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
const { Sider } = Layout;


const AppSider = ({ onCollapse, collapsed }) => {

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} >
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['all']} mode="inline">
        <Menu.Item key="all">
          <UnorderedListOutlined />
          <NavLink to='/'> <span>Список риэлторов</span></NavLink>
        </Menu.Item>
        <Menu.Item key="new">
          <UserAddOutlined />
          <NavLink to='/new'><span>Новый риэлтор</span></NavLink>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

AppSider.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired
}
export default AppSider;