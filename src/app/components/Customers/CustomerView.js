'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, Descriptions, Button, Tag, Spin, message, Space } from 'antd';
import { EditOutlined, ArrowLeftOutlined } from '@ant-design/icons';

export default function CustomerView({ onEdit }) {
  const params = useParams();
  const router = useRouter();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomer();
  }, [params.id]);

  const loadCustomer = () => {
    // Mock data - in real app, fetch from API
    const mockCustomer = {
      id: parseInt(params.id),
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      dob: '1990-01-01',
      address: '123 Main St, City, Country',
      accountType: 'personal',
      status: 'draft',
      createdAt: '2023-01-15',
      documents: [
        { id: 1, type: 'ID', verified: true },
        { id: 2, type: 'Address', verified: true },
      ],
    };
    setCustomer(mockCustomer);
    setLoading(false);
  };

  const handleBack = () => {
    router.push('/customers');
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBack}
          >
            Back to Customers
          </Button>
          <h2 style={{ margin: 0 }}>Customer Details</h2>
        </Space>
        {customer.status === 'draft' && (
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={onEdit}
          >
            Edit
          </Button>
        )}
      </div>

      <Card>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="ID">{customer.id}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={customer.status === 'completed' ? 'green' : 'orange'}>
              {customer.status.toUpperCase()}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Name">{customer.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{customer.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{customer.phone}</Descriptions.Item>
          <Descriptions.Item label="Date of Birth">{customer.dob}</Descriptions.Item>
          <Descriptions.Item label="Address" span={2}>
            {customer.address}
          </Descriptions.Item>
          <Descriptions.Item label="Account Type">
            {customer.accountType}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {customer.createdAt}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card title="Documents" style={{ marginTop: 16 }}>
        <Descriptions column={2}>
          {customer.documents.map((doc) => (
            <Descriptions.Item key={doc.id} label={doc.type}>
              <Tag color={doc.verified ? 'green' : 'red'}>
                {doc.verified ? 'Verified' : 'Pending'}
              </Tag>
            </Descriptions.Item>
          ))}
        </Descriptions>
      </Card>
    </div>
  );
}