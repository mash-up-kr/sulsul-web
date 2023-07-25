'use client';

import { StackView, useStackBall } from '@sulsul/ui';
import { useEffect } from 'react';

export const Falling = () => {
  useEffect(() => {
    if (window.android) {
      window.android.showToastMessage('Hello Native Callback');
    }
  }, []);

  const { boxRef, canvasRef } = useStackBall();
  return (
    <div>
      <h1>HI</h1>
      <StackView boxRef={boxRef} canvasRef={canvasRef} />
    </div>
  );
};
