'use client';
/** @jsxImportSource @emotion/react */

import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { MatterStep } from './MatterStep';

type MatterProps = ComponentPropsWithoutRef<'div'> & {
  list: string[];
  drinkImage: string;
};

export const Matter = forwardRef<HTMLDivElement, MatterProps>(function Button(
  props,
  ref
) {
  const { drinkImage, ...restProps } = props;

  return (
    <div ref={ref} {...restProps}>
      <MatterStep drinkImage={drinkImage} />
    </div>
  );
});
