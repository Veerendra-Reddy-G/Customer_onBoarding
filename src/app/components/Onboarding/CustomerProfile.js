'use client';

import { Form, Input, Button, DatePicker, Select, message } from 'antd';
import { validateRequired, validatePhone, validateDOB } from '@/utils/validation';

const { Option } = Select;
const { TextArea } = Input;

export default function CustomerProfile({ data, onDataChange, onNext, onPrev }) {
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
        label="Full Name"
        name="fullName"
        rules={[{ required: true, message: 'Please input your full name!' }]}
      >
        <Input placeholder="Enter full name" />
      </Form.Item>

      <Form.Item
        label="Phone Number"
        name="phone"
        rules={[
          { required: true, message: 'Please input your phone number!' },
          { 
            validator: (_, value) => 
              validatePhone(value) ? Promise.resolve() : Promise.reject(new Error('Please enter a valid phone number!'))
          }
        ]}
      >
        <Input placeholder="Enter phone number" />
      </Form.Item>

      <Form.Item
        label="Date of Birth"
        name="dob"
        rules={[
          { required: true, message: 'Please select your date of birth!' },
          { 
            validator: (_, value) => 
              validateDOB(value) ? Promise.resolve() : Promise.reject(new Error('You must be at least 18 years old!'))
          }
        ]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: 'Please input your address!' }]}
      >
        <TextArea rows={3} placeholder="Enter your address" />
      </Form.Item>

      <Form.Item>
        <Button style={{ marginRight: 8 }} onClick={onPrev}>
          Previous
        </Button>
        <Button type="primary" htmlType="submit">
          Next
        </Button>
      </Form.Item>
    </Form>
  );
}