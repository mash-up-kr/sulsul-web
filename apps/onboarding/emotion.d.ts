import '@emotion/react';
import { OverridingTheme } from '@sulsul/token';

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends OverridingTheme {}
}
