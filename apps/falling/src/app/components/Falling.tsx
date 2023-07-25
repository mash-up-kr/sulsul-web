'use client';

import { StackView, useStackBall } from '@sulsul/ui';
import { useEffect, useState } from 'react';

export const Falling = () => {
  const [counts, setCounts] = useState(0);
  const [messageFromAndroid, setMessageFromAndroid] = useState('');

  useEffect(() => {
    const eventFromAndroid = async (event: any) => {
      setMessageFromAndroid(event.detail.data);
    };

    window.addEventListener('javascriptFunction', eventFromAndroid);

    if (window.android) {
      window.android.callJavaScriptFunction();
    }

    return () => {
      window.removeEventListener('javascriptFunction', eventFromAndroid);
    };
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
      <h2>{messageFromAndroid}</h2>
      <button onClick={addDrink}>Add Drink</button>
      <StackView boxRef={boxRef} canvasRef={canvasRef} />
    </div>
  );
};
