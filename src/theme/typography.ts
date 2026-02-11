import type { ThemeOptions } from '@mui/material/styles';
import { fontFamilies, fontWeights } from './tokens';

/**
 * MUI typography overrides derived from design tokens.
 */
export const typography: ThemeOptions['typography'] = {
  fontFamily: fontFamilies.body,
  fontWeightRegular: fontWeights.regular,
  fontWeightMedium: fontWeights.medium,
  fontWeightBold: fontWeights.bold,

  h1: {
    fontFamily: fontFamilies.heading,
    fontWeight: fontWeights.bold,
    fontSize: '2.5rem',    // 40px
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontFamily: fontFamilies.heading,
    fontWeight: fontWeights.bold,
    fontSize: '2rem',      // 32px
    lineHeight: 1.25,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontFamily: fontFamilies.heading,
    fontWeight: fontWeights.semibold,
    fontSize: '1.5rem',    // 24px
    lineHeight: 1.3,
  },
  h4: {
    fontFamily: fontFamilies.heading,
    fontWeight: fontWeights.semibold,
    fontSize: '1.25rem',   // 20px
    lineHeight: 1.35,
  },
  h5: {
    fontFamily: fontFamilies.heading,
    fontWeight: fontWeights.medium,
    fontSize: '1.125rem',  // 18px
    lineHeight: 1.4,
  },
  h6: {
    fontFamily: fontFamilies.heading,
    fontWeight: fontWeights.medium,
    fontSize: '1rem',      // 16px
    lineHeight: 1.45,
  },
  subtitle1: {
    fontWeight: fontWeights.medium,
    fontSize: '1rem',
    lineHeight: 1.5,
  },
  subtitle2: {
    fontWeight: fontWeights.medium,
    fontSize: '0.875rem',
    lineHeight: 1.5,
  },
  body1: {
    fontSize: '1rem',      // 16px
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',  // 14px
    lineHeight: 1.5,
  },
  button: {
    fontWeight: fontWeights.semibold,
    fontSize: '0.875rem',
    lineHeight: 1.5,
    textTransform: 'none', // No ALL CAPS by default
  },
  caption: {
    fontSize: '0.75rem',   // 12px
    lineHeight: 1.5,
  },
  overline: {
    fontWeight: fontWeights.semibold,
    fontSize: '0.75rem',
    lineHeight: 1.5,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
};
