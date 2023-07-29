'use client';

import { StackView, useStackBall } from '@sulsul/ui';
import { useEffect, useState } from 'react';
import { drinkImage, drinks } from '../constants/drinks';

export const Falling = () => {
  const [isFirstTouch, setIsFirstTouch] = useState(false);
  const { addBall, boxRef, canvasRef } = useStackBall();

  useEffect(() => {
    const addItem = (event: any) => {
      if (!isFirstTouch) {
        setIsFirstTouch(true);
        return;
      }

      if (event.detail.data === undefined) {
        throw new Error('event.detail.data is undefined');
      }

      const { image, size } = drinkImage[event.detail.data as drinks];
      addBall(image, size);

      window.sulsulBridge.onAddBallSuccess(event.detail.data as drinks);
    };
    window.addEventListener('addBall', addItem);

    return () => {
      window.removeEventListener('addBall', addItem);
    };
  }, [addBall, isFirstTouch]);

  return (
    <div style={{ width: '100%', height: '100dvh' }}>
      <StackView boxRef={boxRef} canvasRef={canvasRef} isTouched={isFirstTouch} />
    </div>
  );
};
