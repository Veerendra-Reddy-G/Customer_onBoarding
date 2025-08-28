 
'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  Layout,
  Menu,
  Button,
  theme,
  Dropdown,
  Space,
  Avatar
} from 'antd';
import {
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  LoginOutlined,
  BulbOutlined,
  BulbFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useAuth } from '@/app/context/AuthContext';

const { Header: AntHeader, Content, Sider } = Layout;

export default function AppLayout({ children, toggleTheme, isDarkMode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => router.push('/dashboard'),
    },
    {
      key: '/customers',
      icon: <TeamOutlined />,
      label: 'Customers',
      onClick: () => router.push('/customers'),
    },
    {
      key: '/onboarding',
      icon: <UserOutlined />,
      label: 'Onboarding',
      onClick: () => router.push('/onboarding'),
    },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const userMenuItems = [
    {
      key: '1',
      label: 'Profile',
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: 'Logout',
      icon: <LoginOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
        trigger={null}
        theme={isDarkMode ? 'dark' : 'light'}
      >
        <div style={{ 
          height: 32, 
          margin: 16, 
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isDarkMode ? 'white' : 'inherit',
          fontWeight: 'bold'
        }}>
          {collapsed ? 'CA' : 'Customer App'}
        </div>
        <Menu
          theme={isDarkMode ? 'dark' : 'light'}
          selectedKeys={[pathname]}
          mode="inline"
          items={menuItems}
        />
      </Sider>
      <Layout>
        <AntHeader style={{ 
          padding: 0, 
          background: colorBgContainer,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: 16
        }}>
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
          
          <Space>
            <Button
              type="text"
              icon={isDarkMode ? <BulbOutlined /> : <BulbFilled />}
              onClick={toggleTheme}
              style={{ fontSize: '16px' }}
            />
            
            <Dropdown
              menu={{
                items: userMenuItems,
              }}
              placement="bottomRight"
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <span>{user?.email}</span>
              </Space>
            </Dropdown>
          </Space>
        </AntHeader>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}