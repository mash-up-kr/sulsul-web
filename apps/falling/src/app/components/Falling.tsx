'use client';

import { StackView, useStackBall } from '@sulsul/ui';
import { useEffect } from 'react';

export const Falling = () => {
  useEffect(() => {
    if (window.android) {
      window.android.showToastMessage('Hello Native Callback');
    }
  }, []);

  const { addBall, boxRef, canvasRef } = useStackBall();

  const addDrink = () => {
    addBall('/images/bubble-beer.png', 100);
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <h1>HI</h1>
      <button onClick={addDrink}>Add Drink</button>
      <StackView boxRef={boxRef} canvasRef={canvasRef} />
    </div>
  );
};
