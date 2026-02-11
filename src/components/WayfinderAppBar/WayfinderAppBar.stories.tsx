import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Avatar from '@mui/material/Avatar';
import { WayfinderAppBar } from './WayfinderAppBar';

const meta = {
  title: 'Components/WayfinderAppBar',
  component: WayfinderAppBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onMenuClick: fn(),
  },
} satisfies Meta<typeof WayfinderAppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** AppBar with sidebar open — shows MenuOpen icon. */
export const SidebarOpen: Story = {
  args: {
    sidebarOpen: true,
    statusLabel: 'Draft',
    onSaveProgress: fn(),
    onMoreClick: fn(),
  },
};

/** AppBar with sidebar closed — shows standard hamburger Menu icon. */
export const SidebarClosed: Story = {
  args: {
    sidebarOpen: false,
    statusLabel: 'Draft',
    onSaveProgress: fn(),
    onMoreClick: fn(),
  },
};

/** AppBar with no action buttons — just a user avatar in the end slot. */
export const WithAvatar: Story = {
  args: {
    sidebarOpen: true,
    endSlot: (
      <Avatar
        sx={{ width: 32, height: 32, bgcolor: 'primary.light', color: 'primary.dark', fontSize: '0.75rem', fontWeight: 600 }}
      >
        OP
      </Avatar>
    ),
  },
};

/** AppBar with sidebar closed and avatar — matches the Figma collapsed state. */
export const CollapsedWithAvatar: Story = {
  args: {
    sidebarOpen: false,
    endSlot: (
      <Avatar
        sx={{ width: 32, height: 32, bgcolor: 'primary.light', color: 'primary.dark', fontSize: '0.75rem', fontWeight: 600 }}
      >
        OP
      </Avatar>
    ),
  },
};
