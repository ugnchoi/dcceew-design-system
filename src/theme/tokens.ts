/**
 * Raw design tokens — sourced from Figma (light.tokens.json / dark.tokens.json).
 * These are framework-agnostic values consumed by palette.ts and other theme files.
 */

// ─── Colors (from Figma) ─────────────────────────────────────────────────────

export const colors = {
  /** DCCEEW primary — teal */
  primary: {
    light: {
      main: '#146D6E',
      dark: '#0F3A41',
      light: '#B8E9E9',
      contrastText: '#FFFFFF',
    },
    dark: {
      main: '#A3DCDC',
      dark: '#5BB6B7',
      light: '#E0F7F7',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
  },

  /** Secondary — indigo */
  secondary: {
    light: {
      main: '#3F51B5',
      dark: '#303F9F',
      light: '#7986CB',
      contrastText: '#FFFFFF',
    },
    dark: {
      main: '#C5CAE9',
      dark: '#9FA8DA',
      light: '#E8EAF6',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
  },

  /** Error — red */
  error: {
    light: {
      main: '#D32F2F',
      dark: '#C62828',
      light: '#EF5350',
      contrastText: '#FFFFFF',
    },
    dark: {
      main: '#F44336',
      dark: '#D32F2F',
      light: '#E57373',
      contrastText: '#FFFFFF',
    },
  },

  /** Warning — orange */
  warning: {
    light: {
      main: '#EF6C00',
      dark: '#E65100',
      light: '#FF9800',
      contrastText: '#FFFFFF',
    },
    dark: {
      main: '#FFA726',
      dark: '#F57C00',
      light: '#FFB74D',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
  },

  /** Info — light blue */
  info: {
    light: {
      main: '#0288D1',
      dark: '#01579B',
      light: '#03A9F4',
      contrastText: '#FFFFFF',
    },
    dark: {
      main: '#29B6F6',
      dark: '#0288D1',
      light: '#4FC3F7',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
  },

  /** Success — green */
  success: {
    light: {
      main: '#2E7D32',
      dark: '#1B5E20',
      light: '#4CAF50',
      contrastText: '#FFFFFF',
    },
    dark: {
      main: '#66BB6A',
      dark: '#388E3C',
      light: '#81C784',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
  },

  /** Text colors */
  text: {
    light: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.60)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    dark: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.70)',
      disabled: 'rgba(255, 255, 255, 0.38)',
    },
  },

  /** Background colors */
  background: {
    light: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    dark: {
      default: '#121212',
      paper: '#121212',
    },
  },

  /** Divider */
  divider: {
    light: 'rgba(0, 0, 0, 0.12)',
    dark: 'rgba(255, 255, 255, 0.12)',
  },

  /** Action states */
  action: {
    light: {
      active: 'rgba(0, 0, 0, 0.54)',
      hover: 'rgba(0, 0, 0, 0.04)',
      selected: 'rgba(0, 0, 0, 0.08)',
      disabled: 'rgba(0, 0, 0, 0.26)',
      disabledBackground: 'rgba(0, 0, 0, 0.12)',
      focus: 'rgba(0, 0, 0, 0.12)',
    },
    dark: {
      active: '#FFFFFF',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.30)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      focus: 'rgba(255, 255, 255, 0.12)',
    },
  },

  /** Common */
  common: {
    black: '#000000',
    white: '#FFFFFF',
  },
} as const;

// ─── Spacing ─────────────────────────────────────────────────────────────────

/** 4px base unit spacing scale */
export const spacing = {
  unit: 4,
  xs: 4,   // 1 unit
  sm: 8,   // 2 units
  md: 16,  // 4 units
  lg: 24,  // 6 units
  xl: 32,  // 8 units
  xxl: 48, // 12 units
} as const;

// ─── Border Radius ───────────────────────────────────────────────────────────

export const radii = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

// ─── Elevation / Shadows ─────────────────────────────────────────────────────

export const elevation = {
  0: 'none',
  1: '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.08)',
  2: '0px 3px 6px rgba(0,0,0,0.12), 0px 2px 4px rgba(0,0,0,0.08)',
  3: '0px 10px 20px rgba(0,0,0,0.12), 0px 3px 6px rgba(0,0,0,0.08)',
  4: '0px 15px 25px rgba(0,0,0,0.12), 0px 5px 10px rgba(0,0,0,0.08)',
} as const;

// ─── Typography ──────────────────────────────────────────────────────────────

export const fontFamilies = {
  heading: '"Public Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
  body: '"Public Sans", "Helvetica Neue", Helvetica, Arial, sans-serif',
  mono: '"Source Code Pro", "Fira Code", monospace',
} as const;

export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

// ─── Motion ──────────────────────────────────────────────────────────────────

export const motion = {
  durationFast: '150ms',
  durationNormal: '250ms',
  durationSlow: '400ms',
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
} as const;
