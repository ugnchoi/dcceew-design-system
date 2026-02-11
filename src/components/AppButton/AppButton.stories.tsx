import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { AppButton } from './AppButton';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

const meta = {
  title: 'Components/AppButton',
  component: AppButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['contained', 'outlined', 'text'],
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'warning', 'info', 'success'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof AppButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

// ── Variants ─────────────────────────────────────────────────────────────────

export const Variants: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <AppButton variant="contained">Contained</AppButton>
      <AppButton variant="outlined">Outlined</AppButton>
      <AppButton variant="text">Text</AppButton>
    </Stack>
  ),
};

// ── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <AppButton size="small">Small</AppButton>
      <AppButton size="medium">Medium</AppButton>
      <AppButton size="large">Large</AppButton>
    </Stack>
  ),
};

// ── Colors ───────────────────────────────────────────────────────────────────

export const Colors: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <AppButton color="primary">Primary</AppButton>
      <AppButton color="secondary">Secondary</AppButton>
      <AppButton color="error">Error</AppButton>
      <AppButton color="warning">Warning</AppButton>
      <AppButton color="info">Info</AppButton>
      <AppButton color="success">Success</AppButton>
    </Stack>
  ),
};

// ── With Icons ───────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <AppButton startIcon={<SaveIcon />}>Save</AppButton>
      <AppButton startIcon={<DeleteIcon />} color="error">
        Delete
      </AppButton>
    </Stack>
  ),
};

// ── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

// ── Loading ──────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: {
    children: 'Saving…',
    loading: true,
  },
};

// ── Interaction: Click ───────────────────────────────────────────────────────

export const ClickInteraction: Story = {
  args: {
    children: 'Click me',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Verify the button is enabled and clickable
    await expect(button).toBeEnabled();
    await userEvent.click(button);
  },
};

// ── Interaction: Keyboard ────────────────────────────────────────────────────

export const KeyboardInteraction: Story = {
  args: {
    children: 'Focus & press Enter',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Tab to focus, then press Enter
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard('{Enter}');
  },
};

// ── Interaction: Loading blocks click ────────────────────────────────────────

export const LoadingBlocksClick: Story = {
  args: {
    children: 'Loading…',
    loading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    // Button should be disabled when loading
    await expect(button).toBeDisabled();
    await expect(button).toHaveAttribute('aria-busy', 'true');
  },
};
