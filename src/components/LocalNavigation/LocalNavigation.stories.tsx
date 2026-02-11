import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Box from '@mui/material/Box';
import { LocalNavigation } from './LocalNavigation';

const meta = {
  title: 'Components/LocalNavigation',
  component: LocalNavigation,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: 600 }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    onStepClick: fn(),
  },
} satisfies Meta<typeof LocalNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FirstStep: Story = {
  args: {
    activeStep: 0,
  },
};

export const LastStep: Story = {
  args: {
    activeStep: 5,
  },
};

export const MiddleStep: Story = {
  args: {
    activeStep: 3,
  },
};
