'use client';

import { StackView, useStackBall } from '@sulsul/ui';
import { useEffect } from 'react';
import { drinks, drink_images } from '../constants/drinks';

export const Falling = () => {
  const { addBall, boxRef, canvasRef } = useStackBall();

  useEffect(() => {
    const addItem = (event: any) => {
      if (event.detail.data === undefined) {
        addBall(drink_images['소주'], 100);
        return;
      }
      addBall(drink_images[event.detail.data as drinks], 100);
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
