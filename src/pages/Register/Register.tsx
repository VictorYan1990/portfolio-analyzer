import React, { useState } from 'react';
import { Form, Input, Button, Layout, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const { Content } = Layout;

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  retypePassword: string;
}

interface RegisterResponse {
  message?: string;
}

const Register: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onFinish = async (values: RegisterFormValues) => {
    setLoading(true);

    // Basic data to send to the server
    const { username, email, password, retypePassword } = values;

    // Validate passwords match before proceeding
    if (password !== retypePassword) {
      notification.error({
        message: 'Password Mismatch',
        description: 'The passwords you entered do not match.',
      });
      setLoading(false);
      return;
    }

    try {
      // Make an API call to the "/users" endpoint
      const response = await fetch('/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        // If registration succeeds, redirect to the Login page
        notification.success({
          message: 'Registration Successful',
          description: 'You can now log in with your new account.',
        });
        navigate('/login');
      } else {
        // If the API returns an error, show the message
        const errorData: RegisterResponse = await response.json();
        notification.error({
          message: 'Registration Failed',
          description: errorData.message || 'An error occurred. Please try again.',
        });
      }
    } catch (error) {
      // Handle any network or unexpected errors
      console.error('Error during registration:', error);
      notification.error({
        message: 'Error',
        description: 'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="register-layout">
      <Content className="register-content">
        <div className="register-box">
          <h2>Register</h2>
          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please enter your username!' }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email address!' },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item
              label="Retype Password"
              name="retypePassword"
              rules={[{ required: true, message: 'Please retype your password!' }]}
            >
              <Input.Password placeholder="Retype your password" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading}>
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default Register; 