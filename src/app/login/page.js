//src/app/login/page.js

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, Card, message, App } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '@/app/context/AuthContext';
import '@/app/globals.css';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const { message } = App.useApp();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Mock authentication - accept any email
      const token = Math.random().toString(36).substring(2);
      login(values.email, token);
      message.success('Login successful!');
      router.push('/dashboard');
    } catch (error) {
      message.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card title="Sign In" className="login-card">
        <Form
          name="login"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Email" 
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              size="large"
              block
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <p style={{ textAlign: 'center', marginTop: '16px', color: '#888' }}>
          Enter any email to sign in (authentication is mocked)
        </p>
      </Card>
    </div>
  );
}