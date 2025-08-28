import { render, screen } from '@testing-library/react';
import OnboardingStepper from '@/components/Onboarding/Stepper';

describe('OnboardingStepper', () => {
  const mockSteps = [
    { title: 'Step 1', content: <div>Step 1 Content</div> },
    { title: 'Step 2', content: <div>Step 2 Content</div> },
  ];

  it('renders the correct number of steps', () => {
    render(
      <OnboardingStepper
        current={0}
        steps={mockSteps}
        onNext={() => {}}
        onPrev={() => {}}
        onSaveDraft={() => {}}
      />
    );
    
    const stepTitles = screen.getAllByText(/Step/);
    expect(stepTitles).toHaveLength(2);
  });

  it('displays the correct current step content', () => {
    render(
      <OnboardingStepper
        current={1}
        steps={mockSteps}
        onNext={() => {}}
        onPrev={() => {}}
        onSaveDraft={() => {}}
      />
    );
    
    expect(screen.getByText('Step 2 Content')).toBeInTheDocument();
  });
});