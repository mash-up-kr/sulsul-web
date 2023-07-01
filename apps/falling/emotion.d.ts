import '@emotion/react';
import { token } from '@sulsul/token';

declare module '@emotion/react' {
  type OverridingTheme = typeof token;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends OverridingTheme {}
}
