import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import './Home.css';

const { Header } = Layout;

interface HomeProps {
  username: string | null;
  handleLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ username, handleLogout }) => {
  // Dropdown menu for user options
  const menu = (
    <Menu>
      <Menu.Item key="logout">
        <a onClick={handleLogout}>Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <Header className="navbar">
        <Menu mode="horizontal" theme="dark" className="menu">
          {/* Left-aligned item */}
          <Menu.Item key="logo" className="nav-left">
            <a href="#">Vic Studio</a>
          </Menu.Item>

          {/* Spacer (empty space between items) */}
          <Menu.Item key="spacer" disabled style={{ flex: 1, pointerEvents: 'none' }}>
            {/* Spacer is not clickable */}
          </Menu.Item>

          {/* Right-aligned items */}
          {!username && (
            <Menu.Item key="register" className="nav-right">
              <Link to="/register">Register</Link>
            </Menu.Item>
          )}
          <Menu.Item key="user" className="nav-right">
            {username ? (
              <Dropdown overlay={menu} trigger={['click']}>
                <a href="#" className="username">
                  {username} ▼
                </a>
              </Dropdown>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Home; 