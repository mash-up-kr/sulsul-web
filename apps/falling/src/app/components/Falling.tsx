'use client';

import { StackView, useStackBall } from '@sulsul/ui';
import { useEffect, useState } from 'react';

export const Falling = () => {
  const [counts, setCounts] = useState(0);

  useEffect(() => {
    if (window.android) {
      window.android.showToastMessage('Hello Native Callback');
    }
  }, []);

  const { addBall, boxRef, canvasRef } = useStackBall();

  const addDrink = () => {
    addBall('/images/bubble-beer.png', 100);
    setCounts((prev) => prev + 1);
  };

  return (
    <div style={{ width: '100%', height: '600px', color: '#f542b6' }}>
      <h1>HI</h1>
      <h2>{counts}</h2>
      <button onClick={addDrink}>Add Drink</button>
      <StackView boxRef={boxRef} canvasRef={canvasRef} />
    </div>
  );
};
