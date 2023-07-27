'use client';

import { StackView, useStackBall } from '@sulsul/ui';
import { useEffect, useState } from 'react';

export const Falling = () => {
  const [test, setTest] = useState(0);
  const { addBall, boxRef, canvasRef } = useStackBall();

  useEffect(() => {
    const addItem = () => {
      addBall('/images/bubble-beer.png', 100);
    };

    if (window && window.sulsulBridge) {
      setTest(test + 1);
      window.addEventListener('addBall', addItem);
    }

    return () => {
      if (window) {
        window.removeEventListener('addBall', addItem);
      }
    };
  }, [addBall, test]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div>{test}</div>
      <StackView boxRef={boxRef} canvasRef={canvasRef} />
    </div>
  );
};
