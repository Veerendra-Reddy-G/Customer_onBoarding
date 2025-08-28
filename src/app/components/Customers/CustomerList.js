'use client';

import { useState, useEffect } from 'react';
import { Table, Button, Space, Input, Tag, message } from 'antd';
import { UserAddOutlined, EditOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Search } = Input;

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    // Mock data - in real app, fetch from API
    const mockCustomers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        status: 'completed',
        createdAt: '2023-01-15',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+0987654321',
        status: 'draft',
        createdAt: '2023-01-16',
      },
      {
        id: 3,
        name: 'Bob Johnson',
        email: 'bob@example.com',
        phone: '+1122334455',
        status: 'completed',
        createdAt: '2023-01-17',
      },
    ];
    setCustomers(mockCustomers);
    setLoading(false);
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'completed' ? 'green' : 'orange'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => router.push(`/customers/${record.id}`)}
          >
            View
          </Button>
          {record.status === 'draft' && (
            <Button 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => router.push(`/customers/${record.id}?edit=true`)}
            >
              Edit
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchText.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Search
          placeholder="Search customers..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          style={{ width: 300 }}
          onSearch={setSearchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button 
          type="primary" 
          icon={<UserAddOutlined />}
          onClick={() => router.push('/onboarding')}
        >
          New Customer
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredCustomers}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}