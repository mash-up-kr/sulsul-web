'use client';

import { StackView, useStackBall } from '@sulsul/ui';
import { useEffect } from 'react';

export const Falling = () => {
  const { addBall, boxRef, canvasRef } = useStackBall();

  useEffect(() => {
    const addItem = async () => {
      addBall('/images/bubble-beer.png', 100);
    };

    window.addEventListener('javascriptFunction', addItem);

    return () => {
      window.removeEventListener('javascriptFunction', addItem);
    };
  }, [addBall]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <StackView boxRef={boxRef} canvasRef={canvasRef} />
    </div>
  );
};
