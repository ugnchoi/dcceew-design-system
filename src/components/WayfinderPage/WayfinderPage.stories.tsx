import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import { WayfinderPage } from './WayfinderPage';

/** Empty AI chat — matches Figma node 13690:95460. */
const emptyAiChatProps = {
  messages: [],
  inlinePrompts: [
    { label: 'inline prompt' },
    { label: 'inline prompt' },
    { label: 'inline prompt' },
  ],
  sourceFiles: [],
  onInputChange: fn(),
  onSend: fn(),
  onAttach: fn(),
  onInlinePromptClick: fn(),
  onExpand: fn(),
};

/** AI chat with a conversation — used in the ChatWithMessages story. */
const conversationAiChatProps = {
  messages: [
    {
      role: 'user' as const,
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      role: 'assistant' as const,
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
  onInputChange: fn(),
  onSend: fn(),
  onAttach: fn(),
  onInlinePromptClick: fn(),
  onCopy: fn(),
  onExpand: fn(),
};

const meta = {
  title: 'Pages/WayfinderPage',
  component: WayfinderPage,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    onPreviousSection: fn(),
    onNextSection: fn(),
    onNavItemClick: fn(),
    onStepClick: fn(),
    onSidebarToggle: fn(),
    onChatToggle: fn(),
    aiChatProps: emptyAiChatProps,
  },
} satisfies Meta<typeof WayfinderPage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Full page with sidebar open, status actions, and answer cards.
 * - Click the **hamburger icon** to toggle the sidebar.
 * - Click the **AI chat FAB** (bottom-right) to open the chat panel.
 * - Click **X** on the chat panel to close it.
 */
export const Default: Story = {
  args: {
    pageTitle: 'Location & Footprint',
    statusLabel: 'Draft',
    onSaveProgress: fn(),
    answerCards: [
      {
        questionTitle:
          '2.1 Where is the primary jurisdiction of the proposed action?',
        description: (
          <>
            The{' '}
            <Link href="#" underline="always">
              primary jurisdiction
            </Link>{' '}
            should reflect the locality where majority of the action is proposed
            to take place. This may be a jurisdiction other than an Australian
            state or territory.
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
      {
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
    ],
    aiGuidanceProps: {
      completeness: 50,
      sections: [
        {
          title: 'Referral signals',
          items: [
            { id: 'ref-1', label: 'List item' },
            { id: 'ref-2', label: 'List item' },
            { id: 'ref-3', label: 'List item' },
          ],
        },
        {
          title: 'Discrepancy check',
          items: [
            { id: 'disc-1', label: 'List item' },
            { id: 'disc-2', label: 'List item' },
            { id: 'disc-3', label: 'List item' },
          ],
        },
      ],
      nextBestStep: 'Next best step',
    },
  },
};

/**
 * Chat panel starts open in the empty state.
 * Matches the Figma design at node 13690:95460.
 */
export const ChatOpen: Story = {
  args: {
    ...Default.args,
    defaultChatOpen: true,
  },
};

/** Chat panel open with a conversation (messages, sources, answer cards). */
export const ChatWithMessages: Story = {
  args: {
    ...Default.args,
    defaultChatOpen: true,
    aiChatProps: conversationAiChatProps,
  },
};

/**
 * Sidebar collapsed + avatar in appbar.
 * Matches the Figma screen at node 13690:82673.
 */
export const SidebarCollapsed: Story = {
  args: {
    ...Default.args,
    defaultSidebarOpen: false,
    statusLabel: undefined,
    onSaveProgress: undefined,
    appBarEndSlot: (
      <Avatar
        sx={{
          width: 32,
          height: 32,
          bgcolor: 'primary.light',
          color: 'primary.dark',
          fontSize: '0.75rem',
          fontWeight: 600,
        }}
      >
        OP
      </Avatar>
    ),
  },
};

/** Empty page with sidebar open. */
export const EmptyPage: Story = {
  args: {
    pageTitle: 'Project Overview',
    activeStep: 0,
    answerCards: [
      {
        questionTitle: '1.1 What is the name of the proposed action?',
        description:
          'Provide a short descriptive name for the proposed action.',
        answer: '',
        sources: [],
        aiSuggestions: [],
      },
    ],
    aiGuidanceProps: {
      completeness: 0,
    },
  },
};
