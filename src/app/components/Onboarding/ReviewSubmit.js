'use client';

import { Card, Button, Descriptions, message } from 'antd';
import { useRouter } from 'next/navigation';

export default function ReviewSubmit({ data, onPrev, onSubmit }) {
  const router = useRouter();

  const handleSubmit = () => {
    // Save to local storage or API
    const onboardingData = {
      ...data,
      status: 'completed',
      submittedAt: new Date().toISOString()
    };
    
    localStorage.setItem('onboardingData', JSON.stringify(onboardingData));
    message.success('Onboarding submitted successfully!');
    router.push('/dashboard');
  };

  return (
    <div>
      <Card title="Review Your Information">
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
          <Descriptions.Item label="Account Type">{data.accountType}</Descriptions.Item>
          <Descriptions.Item label="Full Name">{data.fullName}</Descriptions.Item>
          <Descriptions.Item label="Phone">{data.phone}</Descriptions.Item>
          <Descriptions.Item label="Date of Birth">{data.dob}</Descriptions.Item>
          <Descriptions.Item label="Address">{data.address}</Descriptions.Item>
        </Descriptions>
      </Card>
      
      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onPrev}>Previous</Button>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}