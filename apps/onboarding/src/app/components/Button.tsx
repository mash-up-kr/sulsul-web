'use client';
/** @jsxImportSource @emotion/react */

import { Button as ButtonToken } from '@sulsul/ui';
import { ComponentProps, forwardRef, PropsWithChildren } from 'react';

type ButtonProps = ComponentProps<typeof ButtonToken>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props: PropsWithChildren<ButtonProps>, ref) => {
    const { children, ...rest } = props;
    return (
      <ButtonToken ref={ref} {...rest}>
        {children}
      </ButtonToken>
    );
  }
);

Button.displayName = 'Button';
