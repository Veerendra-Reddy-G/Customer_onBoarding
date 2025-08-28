'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Form, Input, Button, DatePicker, Select, Card, message, Space, Spin } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { validateEmail, validatePhone, validateDOB, validateRequired } from '@/utils/validation';

const { Option } = Select;
const { TextArea } = Input;

export default function CustomerEdit() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    loadCustomerData();
  }, [params.id]);

  const loadCustomerData = () => {
    // Mock data - in real app, fetch from API
    setTimeout(() => {
      const mockCustomer = {
        id: parseInt(params.id),
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        dob: '1990-01-01',
        address: '123 Main St, City, Country',
        accountType: 'personal',
        status: 'draft',
      };
      
      form.setFieldsValue({
        ...mockCustomer,
        dob: mockCustomer.dob ? new Date(mockCustomer.dob) : null
      });
      setLoading(false);
    }, 500);
  };

  const handleSave = async (values) => {
    setSaving(true);
    try {
      // In a real app, you would call an API here
      console.log('Saving customer data:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      message.success('Customer data saved successfully!');
      router.push('/customers');
    } catch (error) {
      message.error('Failed to save customer data. Please try again.');
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/customers/${params.id}`);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Card title="Edit Customer">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            accountType: 'personal',
            status: 'draft'
          }}
        >
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              { required: true, message: 'Please input the customer name!' },
              { min: 2, message: 'Name must be at least 2 characters!' }
            ]}
          >
            <Input placeholder="Enter full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input the email!' },
              { 
                validator: (_, value) => 
                  validateEmail(value) ? Promise.resolve() : Promise.reject(new Error('Please enter a valid email!'))
              }
            ]}
          >
            <Input placeholder="Enter email" type="email" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: 'Please input the phone number!' },
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
              { required: true, message: 'Please select date of birth!' },
              { 
                validator: (_, value) => 
                  validateDOB(value) ? Promise.resolve() : Promise.reject(new Error('Customer must be at least 18 years old!'))
              }
            ]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input the address!' }]}
          >
            <TextArea rows={3} placeholder="Enter address" />
          </Form.Item>

          <Form.Item
            label="Account Type"
            name="accountType"
            rules={[{ required: true, message: 'Please select account type!' }]}
          >
            <Select placeholder="Select account type">
              <Option value="personal">Personal</Option>
              <Option value="business">Business</Option>
              <Option value="premium">Premium</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select status!' }]}
          >
            <Select placeholder="Select status">
              <Option value="draft">Draft</Option>
              <Option value="pending">Pending Review</Option>
              <Option value="approved">Approved</Option>
              <Option value="rejected">Rejected</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={saving}
                icon={<SaveOutlined />}
              >
                Save Changes
              </Button>
              <Button 
                onClick={handleCancel}
                icon={<CloseOutlined />}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}