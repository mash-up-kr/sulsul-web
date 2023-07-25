'use client';

import { StackView, useStackBall } from '@sulsul/ui';
import { useEffect } from 'react';

export const Falling = () => {
  useEffect(() => {
    const eventFromAndroid = async () => {
      addBall('/images/bubble-beer.png', 100);
    };

    window.addEventListener('javascriptFunction', eventFromAndroid);

    if (window.sulsulBridge) {
      window.sulsulBridge.callJavaScriptFunction();
    }

    return () => {
      window.removeEventListener('javascriptFunction', eventFromAndroid);
    };
  }, []);

  const { addBall, boxRef, canvasRef } = useStackBall();

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <StackView boxRef={boxRef} canvasRef={canvasRef} />
    </div>
  );
};
