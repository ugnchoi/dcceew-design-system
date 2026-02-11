import { createTheme, type ThemeOptions } from '@mui/material/styles';
import { lightPalette, darkPalette } from './palette';
import { typography } from './typography';
import { components } from './components';
import { radii, spacing as spacingTokens } from './tokens';

/**
 * Build a complete MUI theme for the given color mode.
 */
export function getDesignTokens(mode: 'light' | 'dark'): ThemeOptions {
  const palette = mode === 'light' ? lightPalette : darkPalette;

  return {
    palette,
    typography,
    spacing: spacingTokens.unit, // 4px base unit
    shape: {
      borderRadius: radii.sm,   // 4px default (matches Figma)
    },
    components,
  };
}

/** Light theme (default) */
export const lightTheme = createTheme(getDesignTokens('light'));

/** Dark theme */
export const darkTheme = createTheme(getDesignTokens('dark'));

/** Re-export tokens for direct consumption */
export * from './tokens';
export { lightPalette, darkPalette } from './palette';
export { typography } from './typography';
export { components } from './components';
