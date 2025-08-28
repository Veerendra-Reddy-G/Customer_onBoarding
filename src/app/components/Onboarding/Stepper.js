'use client';

import { Steps, Button } from 'antd';
import { useState } from 'react';

const { Step } = Steps;

export default function OnboardingStepper({ current, steps, onNext, onPrev, onSaveDraft }) {
  return (
    <div>
      <Steps current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => onPrev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => onNext()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => alert('Processing complete!')}>
            Done
          </Button>
        )}
        <Button style={{ margin: '0 8px' }} onClick={onSaveDraft}>
          Save as Draft
        </Button>
      </div>
    </div>
  );
}