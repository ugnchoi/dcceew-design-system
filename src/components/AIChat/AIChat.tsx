import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import CloseIcon from '@mui/icons-material/Close';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

// ─── Sub-types ────────────────────────────────────────────────────────────────

export interface ChatAnswerCard {
  /** Question reference label (e.g. "Question 1.1") */
  questionLabel: string;
  /** Bullet-point items in the answer */
  points: string[];
}

export interface ChatMessage {
  /** Who sent the message */
  role: 'user' | 'assistant';
  /** Plain text content (shown in user bubbles and as "AI Answer" prefix) */
  text?: string;
  /** Structured answer card (AI only) */
  answerCard?: ChatAnswerCard;
}

export interface InlinePrompt {
  /** Chip label */
  label: string;
}

export interface SourceFile {
  /** File display name */
  name: string;
  /** Whether this file was uploaded by the user */
  uploaded?: boolean;
}

export interface AIChatProps {
  /** Chat messages to display */
  messages?: ChatMessage[];
  /** Inline prompt suggestions shown after the last AI message */
  inlinePrompts?: InlinePrompt[];
  /** Source files attached to the conversation */
  sourceFiles?: SourceFile[];
  /** Number of additional source files not displayed */
  moreSourcesCount?: number;
  /** Current value of the input field */
  inputValue?: string;
  /** Placeholder text for the input field */
  inputPlaceholder?: string;
  /** Callback when the input value changes */
  onInputChange?: (value: string) => void;
  /** Callback when the send button (or Enter) is pressed */
  onSend?: () => void;
  /** Callback when the "+" attach button is clicked */
  onAttach?: () => void;
  /** Callback when an inline prompt chip is clicked */
  onInlinePromptClick?: (index: number) => void;
  /** Callback when "COPY" is clicked on an answer card */
  onCopy?: (questionLabel: string) => void;
  /** Callback when the expand/fullscreen button is clicked */
  onExpand?: () => void;
  /** Callback when the close button is clicked */
  onClose?: () => void;
  /** Width of the panel */
  width?: number;
}

/** elevation/3 shadow from Figma design tokens */
const ELEVATION_3 =
  '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)';

/**
 * AIChat — A floating chat panel for the AI Assistant in Wayfinder.
 *
 * Displays a conversation with user message bubbles, structured AI answer cards,
 * inline prompt suggestions, source file chips, and a chat input bar.
 * Typically opened by the AIChatFab.
 */
export const AIChat = React.forwardRef<HTMLDivElement, AIChatProps>(
  function AIChat(
    {
      messages = [],
      inlinePrompts = [],
      sourceFiles = [],
      moreSourcesCount = 0,
      inputValue = '',
      inputPlaceholder = 'Ask anything',
      onInputChange,
      onSend,
      onAttach,
      onInlinePromptClick,
      onCopy,
      onExpand,
      onClose,
      width = 435,
    },
    ref,
  ) {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        onSend?.();
      }
    };

    return (
      <Card
        ref={ref}
        sx={{
          width,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 3,
          boxShadow: ELEVATION_3,
          overflow: 'hidden',
        }}
      >
        {/* ── Header ──────────────────────────────────────────────────── */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 2,
            flexShrink: 0,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 500 }}>
            AI Assistant
          </Typography>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <IconButton
              size="small"
              onClick={onExpand}
              aria-label="Expand chat"
              sx={{ color: 'action.active' }}
            >
              <OpenInFullOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={onClose}
              aria-label="Close chat"
              sx={{ color: 'action.active' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Divider />

        {/* ── Messages ────────────────────────────────────────────────── */}
        <Box
          sx={{
            flex: 1,
            overflow: 'auto',
            px: 3,
            py: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >
          {/* Empty state placeholder */}
          {messages.length === 0 && (
            <Typography variant="body1" color="text.primary">
              Ask anything
            </Typography>
          )}

          {messages.map((msg, i) =>
            msg.role === 'user' ? (
              <UserBubble key={i} text={msg.text ?? ''} />
            ) : (
              <AssistantMessage
                key={i}
                text={msg.text}
                answerCard={msg.answerCard}
                onCopy={onCopy}
              />
            ),
          )}

          {/* Spacer pushes inline prompts to the bottom in empty state */}
          {messages.length === 0 && <Box sx={{ flex: 1 }} />}

          {/* Inline prompts — pinned to bottom when empty, after messages otherwise */}
          {inlinePrompts.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {inlinePrompts.map((prompt, i) => (
                <Chip
                  key={i}
                  label={prompt.label}
                  size="small"
                  variant="outlined"
                  clickable
                  onClick={() => onInlinePromptClick?.(i)}
                  sx={{
                    fontSize: '0.8125rem',
                    fontWeight: 400,
                    lineHeight: '18px',
                    letterSpacing: '0.16px',
                    height: 28,
                    borderColor: 'secondary.main',
                    color: 'secondary.main',
                  }}
                />
              ))}
            </Box>
          )}
        </Box>

        {/* ── Source files bar ─────────────────────────────────────────── */}
        {sourceFiles.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 1.5,
              borderTop: 1,
              borderColor: 'divider',
              flexWrap: 'wrap',
              flexShrink: 0,
            }}
          >
            {sourceFiles.map((file, i) => (
              <Chip
                key={i}
                icon={
                  file.uploaded ? (
                    <FileUploadOutlinedIcon
                      sx={{ fontSize: '16px !important', color: 'inherit' }}
                    />
                  ) : (
                    <DescriptionOutlinedIcon
                      sx={{ fontSize: '16px !important', color: 'inherit' }}
                    />
                  )
                }
                label={file.name}
                size="small"
                color="secondary"
                sx={{
                  fontSize: '0.8125rem',
                  fontWeight: 400,
                  lineHeight: '18px',
                  letterSpacing: '0.16px',
                  height: 28,
                }}
              />
            ))}
            {moreSourcesCount > 0 && (
              <Chip
                label={`+${moreSourcesCount}`}
                size="small"
                variant="outlined"
                sx={{
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  height: 28,
                  minWidth: 28,
                  borderColor: 'secondary.main',
                  color: 'secondary.main',
                }}
              />
            )}
          </Box>
        )}

        {/* ── Input bar ───────────────────────────────────────────────── */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 1.5,
            borderTop: 1,
            borderColor: 'divider',
            flexShrink: 0,
          }}
        >
          <IconButton
            size="small"
            onClick={onAttach}
            aria-label="Attach file"
            sx={{ color: 'action.active' }}
          >
            <AddIcon />
          </IconButton>

          <TextField
            fullWidth
            variant="standard"
            placeholder={inputPlaceholder}
            value={inputValue}
            onChange={(e) => onInputChange?.(e.target.value)}
            onKeyDown={handleKeyDown}
            slotProps={{
              input: {
                disableUnderline: true,
                sx: {
                  fontSize: '1rem',
                  lineHeight: '24px',
                  letterSpacing: '0.15px',
                },
              },
            }}
          />

          <IconButton
            size="small"
            onClick={onSend}
            aria-label="Send message"
            disabled={!inputValue.trim()}
            sx={{
              color: 'secondary.main',
              '&.Mui-disabled': {
                color: 'action.disabled',
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Card>
    );
  },
);

// ─── Internal sub-components ──────────────────────────────────────────────────

function UserBubble({ text }: { text: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Box
        sx={{
          bgcolor: 'action.selected',
          borderRadius: 3,
          px: 2.5,
          py: 1.5,
          maxWidth: '85%',
        }}
      >
        <Typography variant="body1">{text}</Typography>
      </Box>
    </Box>
  );
}

function AssistantMessage({
  text,
  answerCard,
  onCopy,
}: {
  text?: string;
  answerCard?: ChatAnswerCard;
  onCopy?: (questionLabel: string) => void;
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {/* "AI Answer" label */}
      <Typography variant="body1" sx={{ fontWeight: 400 }}>
        {text ?? 'AI Answer'}
      </Typography>

      {/* Answer card */}
      {answerCard && (
        <Box
          sx={{
            border: 1,
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
          }}
        >
          {/* Card header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1,
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: 'secondary.main', fontWeight: 600 }}
            >
              {answerCard.questionLabel}
            </Typography>
            <Button
              size="small"
              variant="text"
              startIcon={
                <ContentCopyOutlinedIcon
                  sx={{ fontSize: '16px !important' }}
                />
              }
              onClick={() => onCopy?.(answerCard.questionLabel)}
              sx={{
                color: 'secondary.main',
                fontWeight: 500,
                fontSize: '0.8125rem',
                lineHeight: '22px',
                letterSpacing: '0.46px',
                textTransform: 'uppercase',
                minWidth: 'auto',
              }}
            >
              Copy
            </Button>
          </Box>

          {/* Bullet points */}
          <Box
            component="ul"
            sx={{
              m: 0,
              px: 2,
              py: 1.5,
              pl: 4.5,
              listStyleType: 'disc',
              '& li': {
                mb: 1,
                '&:last-child': { mb: 0 },
              },
            }}
          >
            {answerCard.points.map((point, i) => (
              <Typography key={i} component="li" variant="body1">
                {point}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
