import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Box from '@mui/material/Box';
import { AIGuidance } from './AIGuidance';

const meta = {
  title: 'Components/AIGuidance',
  component: AIGuidance,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 400 }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    onRunCheck: fn(),
    onNextBestStep: fn(),
    onItemClick: fn(),
  },
} satisfies Meta<typeof AIGuidance>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HighCompleteness: Story = {
  args: {
    completeness: 85,
  },
};

export const LowCompleteness: Story = {
  args: {
    completeness: 15,
  },
};

export const CustomSections: Story = {
  args: {
    completeness: 75,
    sections: [
      {
        title: 'Referral signals',
        items: [
          { id: '1', label: 'Threatened species detected' },
          { id: '2', label: 'Water quality impacts' },
        ],
      },
      {
        title: 'Discrepancy check',
        items: [
          { id: '3', label: 'Area measurement mismatch' },
          { id: '4', label: 'Missing vegetation survey' },
          { id: '5', label: 'Incomplete mitigation plan' },
        ],
      },
    ],
  },
};
