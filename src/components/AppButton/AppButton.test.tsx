import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import axe from 'axe-core';
import { AppButton } from './AppButton';
import { lightTheme } from '../../theme';

/** Helper: render with theme */
function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>);
}

/** Helper: run axe and return violations */
async function checkA11y(container: HTMLElement) {
  const results = await axe.run(container);
  return results.violations;
}

describe('AppButton', () => {
  // ── Rendering ──────────────────────────────────────────────────────────

  it('renders without crashing', () => {
    renderWithTheme(<AppButton>Click me</AppButton>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('renders children text', () => {
    renderWithTheme(<AppButton>Submit</AppButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Submit');
  });

  // ── Ref forwarding ────────────────────────────────────────────────────

  it('forwards ref to the underlying button element', () => {
    const ref = createRef<HTMLButtonElement>();
    renderWithTheme(<AppButton ref={ref}>Ref test</AppButton>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  // ── Default props ─────────────────────────────────────────────────────

  it('defaults to contained variant', () => {
    renderWithTheme(<AppButton>Default</AppButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-contained');
  });

  it('allows overriding variant', () => {
    renderWithTheme(<AppButton variant="outlined">Outlined</AppButton>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('MuiButton-outlined');
  });

  // ── Click interaction ─────────────────────────────────────────────────

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    renderWithTheme(<AppButton onClick={handleClick}>Press</AppButton>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // ── Keyboard interaction ──────────────────────────────────────────────

  it('can be activated via Enter key', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    renderWithTheme(<AppButton onClick={handleClick}>Enter</AppButton>);

    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be activated via Space key', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    renderWithTheme(<AppButton onClick={handleClick}>Space</AppButton>);

    screen.getByRole('button').focus();
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // ── Disabled state ────────────────────────────────────────────────────

  it('does not fire onClick when disabled (pointer-events: none)', () => {
    const handleClick = vi.fn();
    renderWithTheme(
      <AppButton disabled onClick={handleClick}>
        Disabled
      </AppButton>,
    );

    // MUI sets pointer-events: none on disabled buttons.
    // Use fireEvent (which bypasses pointer-events check) to verify
    // the native disabled attribute prevents the handler.
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('has disabled attribute when disabled', () => {
    renderWithTheme(<AppButton disabled>Disabled</AppButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  // ── Loading state ─────────────────────────────────────────────────────

  it('disables the button when loading', () => {
    renderWithTheme(<AppButton loading>Loading</AppButton>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows a spinner when loading', () => {
    renderWithTheme(<AppButton loading>Loading</AppButton>);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('sets aria-busy when loading', () => {
    renderWithTheme(<AppButton loading>Loading</AppButton>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  it('does not set aria-busy when not loading', () => {
    renderWithTheme(<AppButton>Normal</AppButton>);
    expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy');
  });

  it('does not fire onClick when loading', () => {
    const handleClick = vi.fn();
    renderWithTheme(
      <AppButton loading onClick={handleClick}>
        Loading
      </AppButton>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  // ── Focus management ──────────────────────────────────────────────────

  it('is focusable via tab', async () => {
    const user = userEvent.setup();
    renderWithTheme(<AppButton>Tab me</AppButton>);

    await user.tab();
    expect(screen.getByRole('button')).toHaveFocus();
  });

  // ── Accessibility ─────────────────────────────────────────────────────

  it('has no accessibility violations', async () => {
    const { container } = renderWithTheme(<AppButton>Accessible</AppButton>);
    const violations = await checkA11y(container);
    expect(violations).toHaveLength(0);
  });

  it('has no accessibility violations when disabled', async () => {
    const { container } = renderWithTheme(
      <AppButton disabled>Disabled</AppButton>,
    );
    const violations = await checkA11y(container);
    expect(violations).toHaveLength(0);
  });

  it('has no accessibility violations when loading', async () => {
    const { container } = renderWithTheme(
      <AppButton loading>Loading</AppButton>,
    );
    const violations = await checkA11y(container);
    expect(violations).toHaveLength(0);
  });

  // ── Size variants ─────────────────────────────────────────────────────

  it('supports size="small"', () => {
    renderWithTheme(<AppButton size="small">Small</AppButton>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeSmall');
  });

  it('supports size="large"', () => {
    renderWithTheme(<AppButton size="large">Large</AppButton>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-sizeLarge');
  });

  // ── Color variants ────────────────────────────────────────────────────

  it('supports color="secondary"', () => {
    renderWithTheme(<AppButton color="secondary">Secondary</AppButton>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-colorSecondary');
  });

  it('supports color="error"', () => {
    renderWithTheme(<AppButton color="error">Error</AppButton>);
    expect(screen.getByRole('button')).toHaveClass('MuiButton-colorError');
  });
});
