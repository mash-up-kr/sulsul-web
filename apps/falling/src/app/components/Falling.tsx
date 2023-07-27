'use client';

import { StackView, useStackBall } from '@sulsul/ui';
import { useEffect } from 'react';
import { drinkImage, drinks } from '../constants/drinks';

export const Falling = () => {
  const { addBall, boxRef, canvasRef } = useStackBall();

  useEffect(() => {
    const addItem = (event: any) => {
      if (event.detail.data === undefined) {
        const { image, size } = drinkImage['소주'];
        addBall(image, size);
        return;
      }
      const { image, size } = drinkImage[event.detail.data as drinks];
      addBall(image, size);
    };
    window.addEventListener('addBall', addItem);

    return () => {
      window.removeEventListener('addBall', addItem);
    };
  }, [addBall]);

  return (
    <div style={{ width: '100%', height: '100dvh' }}>
      <StackView boxRef={boxRef} canvasRef={canvasRef} />
    </div>
  );
};
