import type { PaletteOptions } from '@mui/material/styles';
import { colors } from './tokens';

/**
 * MUI palette overrides derived from Figma design tokens.
 */

export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: colors.primary.light,
  secondary: colors.secondary.light,
  error: colors.error.light,
  warning: colors.warning.light,
  info: colors.info.light,
  success: colors.success.light,
  text: colors.text.light,
  background: colors.background.light,
  divider: colors.divider.light,
  action: colors.action.light,
};

export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: colors.primary.dark,
  secondary: colors.secondary.dark,
  error: colors.error.dark,
  warning: colors.warning.dark,
  info: colors.info.dark,
  success: colors.success.dark,
  text: colors.text.dark,
  background: colors.background.dark,
  divider: colors.divider.dark,
  action: colors.action.dark,
};
