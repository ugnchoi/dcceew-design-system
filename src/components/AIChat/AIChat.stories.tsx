import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Box from '@mui/material/Box';
import { AIChat } from './AIChat';

const meta = {
  title: 'Components/AIChat',
  component: AIChat,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <Box sx={{ height: 695 }}>
        <Story />
      </Box>
    ),
  ],
  args: {
    onInputChange: fn(),
    onSend: fn(),
    onAttach: fn(),
    onInlinePromptClick: fn(),
    onCopy: fn(),
    onExpand: fn(),
    onClose: fn(),
  },
} satisfies Meta<typeof AIChat>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Matches the Figma component definition (node 13668:8609). */
export const Default: Story = {
  args: {
    messages: [
      {
        role: 'user',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      },
      {
        role: 'assistant',
        text: 'AI Answer',
        answerCard: {
          questionLabel: 'Question 1.1',
          points: [
            'Up to 16 Strzelecki Gums (Vulnerable) will be directly or indirectly removed.',
            'Clearing will occur in three patches of native vegetation along Hazel Creek and its tributary (EVC 136 Sedge Wetland, EVC 29 Damp Forest, and Swampy Riparian Woodland).',
          ],
        },
      },
    ],
    inlinePrompts: [
      { label: 'inline prompt' },
      { label: 'inline prompt' },
      { label: 'inline prompt' },
    ],
    sourceFiles: [
      { name: 'Source.pdf' },
      { name: 'Source.pdf' },
      { name: 'uploaded-file.pdf', uploaded: true },
    ],
    moreSourcesCount: 3,
    inputValue: '',
  },
};

/**
 * Empty chat state — matches Figma node 13690:95460.
 * "Ask anything" placeholder at top, inline prompts pinned to bottom.
 */
export const Empty: Story = {
  args: {
    messages: [],
    inlinePrompts: [
      { label: 'inline prompt' },
      { label: 'inline prompt' },
      { label: 'inline prompt' },
    ],
    sourceFiles: [],
    inputValue: '',
  },
};

/** Chat with a typed message ready to send. */
export const WithInput: Story = {
  args: {
    messages: [
      {
        role: 'user',
        text: 'What species are affected by the proposed clearing?',
      },
      {
        role: 'assistant',
        text: 'AI Answer',
        answerCard: {
          questionLabel: 'Question 2.3',
          points: [
            'Strzelecki Gum (Eucalyptus strzeleckii) — listed as Vulnerable under the EPBC Act.',
            'Swamp Skink (Lissolepis coventryi) — listed as Endangered in Victoria.',
          ],
        },
      },
    ],
    inlinePrompts: [
      { label: 'Show on map' },
      { label: 'Mitigation options' },
    ],
    sourceFiles: [
      { name: 'Flora_Survey.pdf' },
      { name: 'Fauna_Report.pdf' },
    ],
    inputValue: 'What mitigation measures are recommended?',
  },
};

/** Long input text to demonstrate textarea auto-growth in the input bar. */
export const WithLongInput: Story = {
  args: {
    messages: [],
    inlinePrompts: [
      { label: 'inline prompt' },
      { label: 'inline prompt' },
      { label: 'inline prompt' },
    ],
    sourceFiles: [],
    inputValue:
      'Can you summarise the biodiversity impacts for this project, including likely effects on threatened species, habitat fragmentation risk, and the key mitigation actions we should include in the response to regulators?',
  },
};

/** Multiple exchange conversation. */
export const MultiTurn: Story = {
  args: {
    messages: [
      {
        role: 'user',
        text: 'Summarise the project footprint.',
      },
      {
        role: 'assistant',
        text: 'AI Answer',
        answerCard: {
          questionLabel: 'Question 2.1',
          points: [
            'The project footprint covers approximately 12.5 hectares.',
            'It spans across three land parcels in the Latrobe Valley region.',
          ],
        },
      },
      {
        role: 'user',
        text: 'Are there any waterways within the footprint?',
      },
      {
        role: 'assistant',
        text: 'AI Answer',
        answerCard: {
          questionLabel: 'Question 2.2',
          points: [
            'Hazel Creek runs through the eastern portion of the site.',
            'An unnamed tributary intersects the north-west corner.',
          ],
        },
      },
    ],
    inlinePrompts: [
      { label: 'Buffer requirements' },
      { label: 'Waterway conditions' },
    ],
    sourceFiles: [
      { name: 'Hydrology.pdf' },
    ],
    inputValue: '',
  },
};
