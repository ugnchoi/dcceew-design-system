import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Box from '@mui/material/Box';
import { SideNavigation } from './SideNavigation';

const meta = {
  title: 'Components/SideNavigation',
  component: SideNavigation,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: 600, display: 'flex' }}>
        <Story />
        <Box sx={{ flex: 1, bgcolor: 'grey.50', p: 4, transition: 'all 225ms' }}>
          Main content area
        </Box>
      </Box>
    ),
  ],
  args: {
    onItemClick: fn(),
  },
} satisfies Meta<typeof SideNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Sidebar expanded (default). */
export const Open: Story = {
  args: {
    open: true,
  },
};

/** Sidebar collapsed — zero width with smooth transition. */
export const Closed: Story = {
  args: {
    open: false,
  },
};

export const DocumentsActive: Story = {
  args: {
    activeId: 'documents',
    open: true,
  },
};
