import React from 'react';
import Button, { type ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

/**
 * Props for AppButton.
 * Extends MUI ButtonProps and adds a `loading` state.
 */
export interface AppButtonProps extends ButtonProps {
  /**
   * If `true`, shows a spinner and disables interaction.
   * @default false
   */
  loading?: boolean;
}

/**
 * AppButton — Thin wrapper around MUI Button.
 *
 * Enforces design-system defaults (contained, no elevation) and adds
 * a built-in `loading` state with spinner.
 *
 * All standard MUI Button props are forwarded.
 */
export const AppButton = React.forwardRef<HTMLButtonElement, AppButtonProps>(
  function AppButton(
    {
      variant = 'contained',
      disableElevation = true,
      loading = false,
      disabled,
      children,
      startIcon,
      ...rest
    },
    ref,
  ) {
    const isDisabled = disabled || loading;

    return (
      <Button
        ref={ref}
        variant={variant}
        disableElevation={disableElevation}
        disabled={isDisabled}
        startIcon={
          loading ? (
            <CircularProgress
              size={16}
              color="inherit"
              aria-label="Loading"
            />
          ) : (
            startIcon
          )
        }
        aria-busy={loading || undefined}
        {...rest}
      >
        {children}
      </Button>
    );
  },
);
