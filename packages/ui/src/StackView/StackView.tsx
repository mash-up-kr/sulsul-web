'use client';

import { forwardRef } from 'react';

/** @jsxImportSource @emotion/react */

interface StackViewProps {
  boxRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const StackView = forwardRef<HTMLDivElement, StackViewProps>((props, ref) => {
  const { boxRef, canvasRef, ...restProps } = props;

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        ref={boxRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
        {...restProps}
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
});

StackView.displayName = 'StackView';
