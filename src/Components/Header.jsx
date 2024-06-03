// src/Sidebar.js
import React, { useState } from 'react';
import { Layout, Menu, Form, AutoComplete } from 'antd';
import { debounce } from "lodash";
import { SearchOutlined, MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { BiCameraMovie } from "react-icons/bi";
import { Link, useLocation } from 'react-router-dom';



const { Header, Sider, Content } = Layout;

const Sidebar = ({children}) => {
      const location = useLocation();
    const getBaseRoute = (path) => {
        const parts = path.split('/');
        return `/${parts[1]}`;
      };
    

  const [collapsed, setCollapsed] = useState(true);


  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}>
        {!collapsed ? (<div className="logo p-4 text-white text-center">
          <h1 className="text-lg">Movie Mart</h1>
        </div>) : (<div className="logo p-2 text-white text-center flex justify-center items-center">
        <BiCameraMovie fontSize={'40'} color='white'/>
        </div>)}
        <Menu theme="dark" mode="inline" selectedKeys={[getBaseRoute(location.pathname)]}>
          <Menu.Item key="/home" icon={<HomeOutlined />}>
          <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="/search" icon={<SearchOutlined />} >
          <Link to="/search">Search</Link>
          </Menu.Item>
          <Menu.Item key="/profile" icon={<UserOutlined /> }>
          <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<LogoutOutlined />} onClick={() => {
            localStorage.clear();
            window.location.href ='/'
          }}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: collapsed ? 80 : 200 }}  >
        <Header className="bg-white flex  items-center p-0">
          <div className="flex items-center">
          {collapsed ? <MenuUnfoldOutlined className="trigger mr-4 ml-4" onClick={toggleCollapsed}/> : <MenuFoldOutlined className="trigger mr-4 ml-4" onClick={toggleCollapsed} />}
          </div>
        </Header>
        <Content style={{  overflow: 'initial', padding: 24, minHeight: '100vh'}} className="m-4 p-4 bg-white">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
