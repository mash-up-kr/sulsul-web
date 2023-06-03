// Add token file when new token files created
import { colors } from './colors';
import { text } from './text';

export const overridingTheme = { colors, text } as const;
export type OverridingTheme = typeof overridingTheme;
