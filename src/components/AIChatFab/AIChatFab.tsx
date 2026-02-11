import React from 'react';
import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

export interface AIChatFabProps {
  /** Callback when the FAB is clicked */
  onClick?: () => void;
  /** Override the sx prop */
  sx?: import('@mui/material/styles').SxProps<import('@mui/material/styles').Theme>;
}

/** elevation/6 shadow from Figma tokens */
const ELEVATION_6 =
  '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)';

/**
 * AIChatFab — A floating action button for the AI chat assistant.
 *
 * Starts as a circular icon-only button and expands into a pill shape
 * with the "AI ASSISTANT" label on mouse hover, matching the two Figma
 * variants (Default → Expanded).
 */
export const AIChatFab = React.forwardRef<HTMLButtonElement, AIChatFabProps>(
  function AIChatFab({ onClick, sx }, ref) {
    return (
      <Fab
        ref={ref}
        color="secondary"
        aria-label="Open AI chat assistant"
        onClick={onClick}
        size="medium"
        sx={{
          position: 'absolute',
          bottom: 24,
          right: 24,
          boxShadow: ELEVATION_6,
          // Pill expansion on hover
          borderRadius: 99,
          width: 48,
          height: 48,
          minHeight: 'unset',
          px: 1.5,
          gap: 1,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          transition: (theme) =>
            theme.transitions.create(['width', 'border-radius', 'background-color', 'padding'], {
              duration: theme.transitions.duration.short,
              easing: theme.transitions.easing.easeInOut,
            }),
          '&:hover': {
            width: 'auto',
            px: 3,
            bgcolor: 'secondary.dark',
            '& .AIChatFab-label': {
              maxWidth: 200,
              opacity: 1,
              ml: 0,
            },
          },
          ...sx,
        }}
      >
        <Box
          className="AIChatFab-label"
          component="span"
          sx={{
            maxWidth: 0,
            opacity: 0,
            overflow: 'hidden',
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: '24px',
            letterSpacing: '0.4px',
            textTransform: 'uppercase',
            transition: (theme) =>
              theme.transitions.create(['max-width', 'opacity', 'margin'], {
                duration: theme.transitions.duration.short,
                easing: theme.transitions.easing.easeInOut,
              }),
          }}
        >
          AI Assistant
        </Box>
        <ChatOutlinedIcon sx={{ fontSize: 20, flexShrink: 0 }} />
      </Fab>
    );
  },
);
