import '@emotion/react';
import { theme } from '@sulsul/token';

declare module '@emotion/react' {
  type OverridingTheme = typeof theme;
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends OverridingTheme {}
}
