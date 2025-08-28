//src/app/dashboard/page.js

'use client';

import { useRouter } from 'next/navigation';
import { Card, Row, Col, Statistic, Button } from 'antd';
import { UserAddOutlined, TeamOutlined } from '@ant-design/icons';
//import AuthGuard from 'components/AuthGuard';
//import AuthGuard from '@/components/AuthGuard'; // Fixed import path

//import AuthGuard from '../../components/AuthGuard';
import AuthGuard from '../components/Customers/AuthGuard';


export default function Dashboard() {
  const router = useRouter();

  return (
   <AuthGuard>
      <div>
        <h1>Dashboard</h1>
        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Active Customers"
                value={1128}
                prefix={<TeamOutlined />}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Onboarding in Progress"
                value={93}
                prefix={<UserAddOutlined />}
              />
            </Card>
          </Col>
        </Row>
        
        <Row gutter={16}>
          <Col span={12}>
            <Card 
              title="Quick Actions" 
              variant={false}
            >
              <Button 
                type="primary" 
                icon={<UserAddOutlined />} 
                size="large"
                onClick={() => router.push('/onboarding')}
                style={{ marginRight: 16 }}
              >
                New Customer Onboarding
              </Button>
              <Button 
                icon={<TeamOutlined />}
                size="large"
                onClick={() => router.push('/customers')}
              >
                View Customers
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
     </AuthGuard> 
  );
} 