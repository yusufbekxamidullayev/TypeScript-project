import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { NavLink, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider style={{paddingTop:"60px"}} trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: <NavLink to={"admin/actor"}>Aktyorlar</NavLink>,
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: <NavLink to={"admin/movie"}>Kinolar</NavLink>,
            },
            {
              key: '3',
              icon: <UserOutlined />,
              label: <NavLink to={"admin/director"}>Direktorlar</NavLink>,
            },
            {
              key: '4',
              icon: <UserOutlined />,
              label: <NavLink to={"admin/genre"}>Janrlar</NavLink>,
            },
            {
              key: '5',
              icon: <UserOutlined />,
              label: <NavLink to={"admin/category"}>Kategoriyalar</NavLink>,
            },
            {
              key: '6',
              icon: <UserOutlined />,
              label: <NavLink to={"admin/movie-actor"}>Movies and Actors</NavLink>,
            },
            {
              key: '7',
              icon: <UserOutlined />,
              label: <NavLink to={"admin/movie-category"}>Movies and Categories</NavLink>,
            },
            {
              key: '8',
              icon: <UserOutlined />,
              label: <NavLink to={"admin/movie-director"}>Movies and Directors</NavLink>,
            },
            {
              key: '9',
              icon: <UserOutlined />,
              label: <NavLink to={"admin/movie-genre"}>Movies and Genre</NavLink>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
        className='overflow-y-auto h-[90vh]'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;