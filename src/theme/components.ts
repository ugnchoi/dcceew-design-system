import type { Components, Theme } from '@mui/material/styles';
import { radii } from './tokens';

/**
 * MUI component default-prop and style overrides.
 * Each key matches an MUI component name (e.g. MuiButton).
 */
export const components: Components<Theme> = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        borderRadius: radii.sm,
        textTransform: 'none',
        fontWeight: 600,
      },
      sizeSmall: {
        padding: '4px 12px',
        fontSize: '0.8125rem',
      },
      sizeMedium: {
        padding: '8px 20px',
      },
      sizeLarge: {
        padding: '12px 28px',
        fontSize: '1rem',
      },
    },
  },

  MuiTextField: {
    defaultProps: {
      variant: 'outlined',
      size: 'medium',
    },
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: radii.sm,
        },
      },
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: radii.lg,
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: radii.lg,
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: radii.sm,
      },
    },
  },

  MuiTooltip: {
    defaultProps: {
      arrow: true,
    },
    styleOverrides: {
      tooltip: {
        borderRadius: radii.sm,
      },
    },
  },

  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: 'thin',
      },
    },
  },
};
