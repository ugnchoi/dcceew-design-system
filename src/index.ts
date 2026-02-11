// ── Components ───────────────────────────────────────────────────────────────
export { AppButton } from './components/AppButton';
export type { AppButtonProps } from './components/AppButton';

export { WayfinderAppBar } from './components/WayfinderAppBar';
export type { WayfinderAppBarProps } from './components/WayfinderAppBar';

export { SideNavigation, SIDEBAR_TRANSITION_DURATION } from './components/SideNavigation';
export type { SideNavigationProps, NavItem } from './components/SideNavigation';

export { LocalNavigation } from './components/LocalNavigation';
export type { LocalNavigationProps, StepItem } from './components/LocalNavigation';

export { AnswerCard } from './components/AnswerCard';
export type { AnswerCardProps, SourceItem, AISuggestion, InlinePrompt } from './components/AnswerCard';

export { AIGuidance } from './components/AIGuidance';
export type { AIGuidanceProps, GuidanceSection, GuidanceListItem } from './components/AIGuidance';

export { AIChatFab } from './components/AIChatFab';
export type { AIChatFabProps } from './components/AIChatFab';

export { AIChat } from './components/AIChat';
export type {
  AIChatProps,
  ChatMessage,
  ChatAnswerCard,
  AIChatInlinePrompt,
  SourceFile,
} from './components/AIChat';

export { WayfinderPage } from './components/WayfinderPage';
export type { WayfinderPageProps } from './components/WayfinderPage';

// ── Theme ────────────────────────────────────────────────────────────────────
export { lightTheme, darkTheme, getDesignTokens } from './theme';
export * from './theme/tokens';

// ── Hooks ────────────────────────────────────────────────────────────────────
export { useControlled } from './hooks';

// ── Utilities ────────────────────────────────────────────────────────────────
export { mergeSlotProps } from './utils';

// ── Types ────────────────────────────────────────────────────────────────────
export type { InteractiveState, RequireProps, OverrideProps } from './types';
