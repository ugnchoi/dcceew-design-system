import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Link from '@mui/material/Link';
import { AnswerCard } from './AnswerCard';

const meta = {
  title: 'Components/AnswerCard',
  component: AnswerCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 838 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    onAnswerChange: fn(),
    onRunCheck: fn(),
    onAskAI: fn(),
    onInlinePromptClick: fn(),
  },
} satisfies Meta<typeof AnswerCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Matches the filled card instance from the Figma page design. */
export const WithAISuggestions: Story = {
  args: {
    questionTitle:
      '2.1 Where is the primary jurisdiction of the proposed action?',
    description: (
      <>
        The{' '}
        <Link href="#" underline="always">
          primary jurisdiction
        </Link>{' '}
        should reflect the locality where majority of the action is proposed to
        take place. This may be a jurisdiction other than an Australian state or
        territory.
      </>
    ),
    answer:
      'Some vulnerable trees will be directly or indirectly removed.\nClearing will occur in three patches of native vegetation along Hazel Creek and its tributary (EVC 136 Sedge Wetland, EVC 29 Damp Forest, and Swampy Riparian Woodland).',
    sources: [
      { label: 'DOC.PDF', href: '#' },
      { label: 'SOURC...', href: '#' },
      { label: 'SOURC...', href: '#' },
    ],
    moreSourcesCount: 3,
    aiSuggestions: [
      {
        text: 'Run-off impacts left empty. Regulators often require sediment control details.',
      },
      {
        text: 'Vegetation clearing described, but no quantification provided.',
      },
    ],
    aiCheckRun: true,
  },
};

/** Matches the empty card from the Figma component definition (node 13659:285). */
export const Default: Story = {
  args: {
    questionTitle: 'Question',
    description: 'Description',
    answer: '',
    answerPlaceholder: 'Answer',
    sources: [
      { label: 'DOC.PDF', href: '#' },
      { label: 'SOURC...', href: '#' },
      { label: 'SOURC...', href: '#' },
    ],
    moreSourcesCount: 3,
    aiSuggestions: [],
    aiCheckRun: false,
    inlinePrompts: [
      { label: 'inline prompt' },
      { label: 'inline prompt' },
    ],
  },
};

/** Card with no sources and no inline prompts. */
export const Minimal: Story = {
  args: {
    questionTitle:
      '3.2 What is the expected duration of the proposed action?',
    description:
      'Provide an estimated timeline for the proposed action, including start and end dates.',
    answer: '',
    sources: [],
    inlinePrompts: [],
  },
};

/** Card with inline prompts and Ask AI action. */
export const WithInlinePrompts: Story = {
  args: {
    questionTitle:
      '2.3 Describe the vegetation types in the project area.',
    description:
      'List all EVC types and their condition within the project footprint.',
    answer: '',
    sources: [
      { label: 'SURVEY.PDF', href: '#' },
      { label: 'MAP.PDF', href: '#' },
    ],
    moreSourcesCount: 1,
    aiSuggestions: [],
    aiCheckRun: false,
    inlinePrompts: [
      { label: 'Summarise vegetation report' },
      { label: 'List EVC types' },
    ],
  },
};
