import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { WayfinderAppBar } from '../WayfinderAppBar';
import { SideNavigation, SIDEBAR_TRANSITION_DURATION, type NavItem } from '../SideNavigation';
import { LocalNavigation, type StepItem } from '../LocalNavigation';
import { AnswerCard, type AnswerCardProps } from '../AnswerCard';
import { AIGuidance, type AIGuidanceProps } from '../AIGuidance';
import { AIChatFab } from '../AIChatFab';
import { AIChat, type AIChatProps } from '../AIChat';

export interface WayfinderPageProps {
  /** Page title displayed in the header area */
  pageTitle?: string;
  /** Navigation items for the side navigation */
  navItems?: NavItem[];
  /** Currently active nav item id */
  activeNavId?: string;
  /** Steps for the local stepper navigation */
  steps?: StepItem[];
  /** Currently active step index */
  activeStep?: number;
  /** Array of answer card configurations */
  answerCards?: AnswerCardProps[];
  /** AI Guidance panel props */
  aiGuidanceProps?: AIGuidanceProps;
  /** Props forwarded to the AIChat panel */
  aiChatProps?: AIChatProps;
  /** Whether the global sidebar starts open */
  defaultSidebarOpen?: boolean;
  /** Controlled sidebar open state (overrides internal state) */
  sidebarOpen?: boolean;
  /** Callback when the sidebar toggle is clicked */
  onSidebarToggle?: (open: boolean) => void;
  /** Whether the AI chat panel starts open */
  defaultChatOpen?: boolean;
  /** Controlled chat open state (overrides internal state) */
  chatOpen?: boolean;
  /** Callback when the chat open state changes */
  onChatToggle?: (open: boolean) => void;
  /** Callback when "Previous Section" is clicked */
  onPreviousSection?: () => void;
  /** Callback when "Next Section" is clicked */
  onNextSection?: () => void;
  /** Callback when a navigation item is clicked */
  onNavItemClick?: (id: string) => void;
  /** Callback when a step is clicked */
  onStepClick?: (index: number) => void;
  /** Callback when Save Progress is clicked (omit to hide the button) */
  onSaveProgress?: () => void;
  /** Status label shown in the appbar (omit to hide) */
  statusLabel?: string;
  /** Optional content rendered at the end of the appbar (e.g. user avatar) */
  appBarEndSlot?: React.ReactNode;
}

/**
 * WayfinderPage — The full page layout for the Wayfinder Self Assessment view.
 *
 * Composes the AppBar, SideNavigation, LocalNavigation (stepper),
 * AnswerCards, AIGuidance panel, AIChatFab, and AIChat popover.
 *
 * The global sidebar can be expanded/collapsed via the appbar hamburger
 * button. Clicking the AI FAB opens the AIChat panel as a popover
 * anchored to the bottom-right corner.
 */
export const WayfinderPage: React.FC<WayfinderPageProps> = ({
  pageTitle = 'Location & Footprint',
  navItems,
  activeNavId,
  steps,
  activeStep,
  answerCards = [],
  aiGuidanceProps,
  aiChatProps,
  defaultSidebarOpen = true,
  sidebarOpen: sidebarOpenProp,
  onSidebarToggle,
  defaultChatOpen = false,
  chatOpen: chatOpenProp,
  onChatToggle,
  onPreviousSection,
  onNextSection,
  onNavItemClick,
  onStepClick,
  onSaveProgress,
  statusLabel,
  appBarEndSlot,
}) => {
  // ── Sidebar state (controlled or uncontrolled) ─────────────────────────
  const isSidebarControlled = sidebarOpenProp !== undefined;
  const [internalSidebarOpen, setInternalSidebarOpen] = useState(defaultSidebarOpen);
  const sidebarOpen = isSidebarControlled ? sidebarOpenProp : internalSidebarOpen;

  const handleMenuClick = useCallback(() => {
    const next = !sidebarOpen;
    if (!isSidebarControlled) {
      setInternalSidebarOpen(next);
    }
    onSidebarToggle?.(next);
  }, [sidebarOpen, isSidebarControlled, onSidebarToggle]);

  // ── Chat panel state (controlled or uncontrolled) ──────────────────────
  const isChatControlled = chatOpenProp !== undefined;
  const [internalChatOpen, setInternalChatOpen] = useState(defaultChatOpen);
  const chatOpen = isChatControlled ? chatOpenProp : internalChatOpen;

  const handleChatOpen = useCallback(() => {
    if (!isChatControlled) {
      setInternalChatOpen(true);
    }
    onChatToggle?.(true);
  }, [isChatControlled, onChatToggle]);

  const handleChatClose = useCallback(() => {
    if (!isChatControlled) {
      setInternalChatOpen(false);
    }
    onChatToggle?.(false);
  }, [isChatControlled, onChatToggle]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Top AppBar — always full width */}
      <WayfinderAppBar
        sidebarOpen={sidebarOpen}
        onMenuClick={handleMenuClick}
        onSaveProgress={onSaveProgress}
        statusLabel={statusLabel}
        endSlot={appBarEndSlot}
      />

      {/* Content area below appbar */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Global side navigation (push drawer) */}
        <SideNavigation
          items={navItems}
          activeId={activeNavId}
          open={sidebarOpen}
          onItemClick={onNavItemClick}
        />

        {/* Local step navigation */}
        <LocalNavigation
          steps={steps}
          activeStep={activeStep}
          onStepClick={onStepClick}
        />

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flex: 1,
            position: 'relative',
            overflow: 'auto',
            bgcolor: 'background.default',
          }}
        >
          <Box sx={{ p: 6, maxWidth: 1400 }}>
            {/* Page header */}
            <Typography
              variant="h4"
              component="h1"
              sx={{ fontWeight: 500, mb: 4 }}
            >
              {pageTitle}
            </Typography>

            {/* Grid: Question cards + AI Guidance */}
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', lg: '1fr 400px' },
                gap: 6,
                alignItems: 'start',
              }}
            >
              {/* Question cards column */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4.5,
                }}
              >
                {answerCards.map((cardProps, index) => (
                  <AnswerCard key={index} {...cardProps} />
                ))}

                {/* Section navigation buttons */}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 1,
                  }}
                >
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<ChevronLeftIcon />}
                    onClick={onPreviousSection}
                    sx={{
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontSize: '0.8125rem',
                    }}
                  >
                    Previous Section
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    endIcon={<ChevronRightIcon />}
                    onClick={onNextSection}
                    sx={{
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      fontSize: '0.8125rem',
                    }}
                  >
                    Next Section
                  </Button>
                </Box>
              </Box>

              {/* AI Guidance sidebar */}
              <Box sx={{ position: 'sticky', top: 0 }}>
                <AIGuidance {...aiGuidanceProps} />
              </Box>
            </Box>
          </Box>

          {/* ── AI Chat FAB + Popover ─────────────────────────────────── */}

          {/* FAB — visible when chat is closed */}
          {!chatOpen && (
            <AIChatFab onClick={handleChatOpen} />
          )}

          {/* AIChat panel — anchored to bottom-right */}
          <Grow
            in={chatOpen}
            style={{ transformOrigin: 'bottom right' }}
            unmountOnExit
          >
            <Box
              sx={{
                position: 'absolute',
                bottom: 24,
                right: 24,
                height: 695,
                maxHeight: 'calc(100% - 48px)',
                zIndex: (theme) => theme.zIndex.modal,
              }}
            >
              <AIChat
                {...aiChatProps}
                onClose={handleChatClose}
              />
            </Box>
          </Grow>
        </Box>
      </Box>
    </Box>
  );
};
