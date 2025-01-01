import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import './Home.css';

const { Header } = Layout;

const Home = ({ username }) => {
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

          {/* Right-aligned item */}
          <Menu.Item key="user" className="nav-right">
            {username ? (
              <span className="username">{username}</span>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Menu.Item>

          <Menu.Item key="register" className="nav-right">
            {username ? (
              <span className="username">{username}</span>
            ) : (
              <Link to="/Register">Register</Link>
            )}
          </Menu.Item>

        </Menu>
      </Header>
    </Layout>
  );
};

export default Home;
