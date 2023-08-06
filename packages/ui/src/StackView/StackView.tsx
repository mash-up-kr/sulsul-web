'use client';
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { token } from '@sulsul/token';
import { forwardRef } from 'react';
import { TouchButton } from './TouchButton';

interface StackViewProps {
  boxRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isTouched?: boolean;
}

const firstTouchDescription = css`
  background-color: ${token.text.subtitle[3]};
  color: ${token.colors.white};
`;

const touchOverlay = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

export const StackView = forwardRef<HTMLDivElement, StackViewProps>((props, ref) => {
  const { boxRef, canvasRef, isTouched = false, ...restProps } = props;

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {!isTouched && (
        <div css={[touchOverlay]}>
          <TouchButton />
          <p css={[firstTouchDescription]}>
            원하는 주종을 선택 후<br /> 터치해서 주량 등록을 시작해주세요
          </p>
        </div>
      )}
      <div
        ref={boxRef}
        style={{
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
