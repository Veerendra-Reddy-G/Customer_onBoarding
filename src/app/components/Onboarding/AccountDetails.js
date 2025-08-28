'use client';

import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import { validateEmail, validateRequired, validateDOB } from '@/utils/validation';

const { Option } = Select;

export default function AccountDetails({ data, onDataChange, onNext }) {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onDataChange(values);
    onNext();
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please fill in all required fields correctly.');
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={data}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please input your email!' },
          { 
            validator: (_, value) => 
              validateEmail(value) ? Promise.resolve() : Promise.reject(new Error('Please enter a valid email!'))
          }
        ]}
      >
        <Input placeholder="Enter email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          { min: 6, message: 'Password must be at least 6 characters!' }
        ]}
      >
        <Input.Password placeholder="Enter password" />
      </Form.Item>

      <Form.Item
        label="Account Type"
        name="accountType"
        rules={[{ required: true, message: 'Please select account type!' }]}
      >
        <Select placeholder="Select account type">
          <Option value="personal">Personal</Option>
          <Option value="business">Business</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
}