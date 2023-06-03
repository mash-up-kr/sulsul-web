import { colors } from '@sulsul/token';

export const overridingTheme = { colors } as const;
export type OverridingTheme = typeof overridingTheme;
