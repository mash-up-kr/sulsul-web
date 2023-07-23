'use client';
/** @jsxImportSource @emotion/react */

import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { MatterStep } from './MatterStep';

type MatterProps = ComponentPropsWithoutRef<'div'> & {
  list: string[];
};

export const Matter = forwardRef<HTMLDivElement, MatterProps>(function Button(
  props,
  ref
) {
  const { ...restProps } = props;

  return (
    <div ref={ref} {...restProps}>
      <MatterStep />
    </div>
  );
});
