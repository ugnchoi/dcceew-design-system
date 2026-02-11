import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Box from '@mui/material/Box';
import { AIChatFab } from './AIChatFab';

const meta = {
  title: 'Components/AIChatFab',
  component: AIChatFab,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <Box
        sx={{
          position: 'relative',
          width: 400,
          height: 200,
          bgcolor: 'grey.100',
          borderRadius: 2,
        }}
      >
        <Story />
      </Box>
    ),
  ],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof AIChatFab>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Hover over the FAB to see it expand into a pill with the "AI ASSISTANT" label.
 */
export const Default: Story = {};
