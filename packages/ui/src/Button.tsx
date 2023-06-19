import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { css } from '@emotion/react';
import { token } from '@sulsul/token';
import '../global.css';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  appearance?: 'primary' | 'default' | 'minimal';
  size?: 'lg' | 'md' | 'sm';
  isLoading?: boolean;
};

const contentsStyle = css`
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    opacity: 0.32;
  }
`;

// button appearance styles
const primaryStyle = css`
  background-color: ${token.colors.primary[100]};
  color: ${token.colors.white};

  &:hover {
    background-color: ${token.colors.primary[200]};
  }
`;

const defaultStyle = css`
  background-color: ${token.colors.grey[300]};
  color: ${token.colors.white};

  &:hover {
    background-color: ${token.colors.grey[200]};
  }
`;

const minimalStyle = css`
  background-color: transparent;
  color: ${token.colors.grey[700]};

  &:hover {
    background-color: ${token.colors.primary[200]};
    opacity: 0.8;
    color: ${token.colors.primary[100]};
  }
`;

// button size styles
const lgStyle = css`
  ${token.text.subtitle[2]}
  padding : 17px 16px;
`;

const mdStyle = css`
  ${token.text.subtitle[3]}
  padding : 9px 12px;
`;

const smStyle = css`
  ${token.text.subtitle[4]}
  padding : 5px 8px;
`;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { children, appearance = 'default', size = 'md', ...restProps } = props;

  const appearanceStyle = {
    primary: primaryStyle,
    default: defaultStyle,
    minimal: minimalStyle,
  }[appearance];

  const sizeStyle = {
    lg: lgStyle,
    md: mdStyle,
    sm: smStyle,
  }[size];

  return (
    <button
      ref={ref}
      css={[contentsStyle, appearanceStyle, sizeStyle]}
      type="button"
      {...restProps}
    >
      {children}
    </button>
  );
});
