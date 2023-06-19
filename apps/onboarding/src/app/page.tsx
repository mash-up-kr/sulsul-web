'use client';

import { Button } from '@sulsul/ui';

export default function Home() {
  return (
    <div style={{ background: 'gray' }}>
      <Button appearance="primary" size="sm">
        onboarding
      </Button>
      <Button size="lg">onboarding</Button>
      <Button appearance="minimal">onboarding</Button>
      <Button css={{ backgroundColor: '#27c583' }}>color test</Button>
    </div>
  );
}
