'use client';

import { StackView, useStackBall } from '@sulsul/ui';
import { useEffect } from 'react';

export const Falling = () => {
  const { addBall, boxRef, canvasRef } = useStackBall();

  useEffect(() => {
    const addItem = () => {
      addBall('/images/bubble-beer.png', 100);
    };

    if (window.sulsulBridge && addBall) {
      window.addEventListener('addBall', addItem);
    }

    return () => {
      window.removeEventListener('addBall', addItem);
    };
  }, [addBall]);

  if (!window.sulsulBridge) {
    return <div>loading...</div>;
  }

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <StackView boxRef={boxRef} canvasRef={canvasRef} />
    </div>
  );
};
