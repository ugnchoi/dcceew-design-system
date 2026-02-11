import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import LinkIcon from '@mui/icons-material/Link';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

export interface SourceItem {
  /** Display label for the source */
  label: string;
  /** URL or identifier for the source */
  href?: string;
}

export interface AISuggestion {
  /** Suggestion text */
  text: string;
}

export interface InlinePrompt {
  /** Display label for the prompt chip */
  label: string;
}

export interface AnswerCardProps {
  /** Question number and title (e.g. "2.1 Where is the primary jurisdiction...") */
  questionTitle: string;
  /** Description text below the question title. Supports React nodes for links. */
  description?: React.ReactNode;
  /** Current answer text */
  answer?: string;
  /** Placeholder for the answer text field */
  answerPlaceholder?: string;
  /** Callback when answer changes */
  onAnswerChange?: (value: string) => void;
  /** List of source documents */
  sources?: SourceItem[];
  /** Number of additional sources not shown */
  moreSourcesCount?: number;
  /** AI-generated suggestions */
  aiSuggestions?: AISuggestion[];
  /** Whether the AI check has been run */
  aiCheckRun?: boolean;
  /** Callback when "Run Check" is clicked */
  onRunCheck?: () => void;
  /** Inline prompt chips shown below the AI section */
  inlinePrompts?: InlinePrompt[];
  /** Callback when "Ask AI" is clicked */
  onAskAI?: () => void;
  /** Callback when an inline prompt chip is clicked */
  onInlinePromptClick?: (index: number) => void;
  /** Number of text field rows */
  rows?: number;
}

/** elevation/1 shadow from Figma design tokens */
const ELEVATION_1 =
  '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)';

/**
 * AnswerCard — A card component for self-assessment questions in Wayfinder.
 *
 * Contains the question title, description, answer text area, source references,
 * AI suggestions section, and optional inline prompt chips with an "Ask AI" action.
 */
export const AnswerCard = React.forwardRef<HTMLDivElement, AnswerCardProps>(
  function AnswerCard(
    {
      questionTitle,
      description,
      answer = '',
      answerPlaceholder = 'Answer',
      onAnswerChange,
      sources = [],
      moreSourcesCount = 0,
      aiSuggestions = [],
      aiCheckRun = false,
      onRunCheck,
      inlinePrompts = [],
      onAskAI,
      onInlinePromptClick,
      rows = 4,
    },
    ref,
  ) {
    const hasInlinePrompts = inlinePrompts.length > 0 || onAskAI;

    return (
      <Card
        ref={ref}
        variant="outlined"
        sx={{
          borderRadius: 3,
          borderColor: '_components.paper.outlineBorder',
          boxShadow: ELEVATION_1,
          overflow: 'hidden',
        }}
      >
        {/* Question header — subtle tinted background */}
        <CardContent
          sx={{
            bgcolor: 'rgba(0, 0, 0, 0.01)',
            pb: 0,
            pt: 3,
            px: 3,
          }}
        >
          <Typography
            variant="h6"
            component="h3"
            sx={{ fontWeight: 500, mb: 0.5 }}
          >
            {questionTitle}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {description}
            </Typography>
          )}
        </CardContent>

        {/* Full-width divider */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} />

        {/* Answer area */}
        <CardContent sx={{ px: 3, pt: 3, pb: 2 }}>
          <TextField
            fullWidth
            multiline
            rows={rows}
            value={answer}
            onChange={(e) => onAnswerChange?.(e.target.value)}
            placeholder={answerPlaceholder}
            variant="outlined"
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                bgcolor: 'background.paper',
                fontSize: '1rem',
                lineHeight: '24px',
                letterSpacing: '0.15px',
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.23)',
              },
            }}
          />

          {/* Sources row */}
          {sources.length > 0 && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                flexWrap: 'wrap',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <LinkIcon
                  sx={{ fontSize: 18, color: 'text.secondary' }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'text.primary',
                  }}
                >
                  Sources
                </Typography>
              </Box>
              {sources.map((source, index) => (
                <Chip
                  key={index}
                  icon={
                    <DescriptionOutlinedIcon
                      sx={{ fontSize: '16px !important' }}
                    />
                  }
                  label={source.label}
                  size="small"
                  variant="outlined"
                  component={source.href ? 'a' : 'div'}
                  href={source.href}
                  clickable={!!source.href}
                  sx={{
                    fontSize: '0.8125rem',
                    fontWeight: 400,
                    lineHeight: '18px',
                    letterSpacing: '0.16px',
                    height: 28,
                    borderColor: 'divider',
                    color: 'text.secondary',
                  }}
                />
              ))}
              {moreSourcesCount > 0 && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  +{moreSourcesCount} MORE
                </Typography>
              )}
            </Box>
          )}
        </CardContent>

        {/* AI Suggestions section */}
        <Box
          sx={{
            bgcolor: aiCheckRun ? 'rgba(63, 81, 181, 0.04)' : 'rgba(63, 81, 181, 0.02)',
            borderTop: 1,
            borderColor: 'divider',
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.5,
              flex: 1,
            }}
          >
            <AutoAwesomeOutlinedIcon
              sx={{
                color: 'secondary.main',
                fontSize: 24,
                mt: 0.25,
              }}
            />
            <Box sx={{ flex: 1 }}>
              {aiSuggestions.length > 0 ? (
                aiSuggestions.map((suggestion, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      color: 'secondary.main',
                      '&::before': {
                        content: '"•  "',
                      },
                      mb:
                        index < aiSuggestions.length - 1 ? 0.5 : 0,
                    }}
                  >
                    {suggestion.text}
                  </Typography>
                ))
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: 'secondary.main' }}
                >
                  Run check to get AI suggestions.
                </Typography>
              )}
            </Box>
          </Box>

          <Button
            variant="text"
            size="small"
            onClick={onRunCheck}
            sx={{
              color: 'secondary.main',
              fontWeight: 500,
              fontSize: '0.8125rem',
              lineHeight: '22px',
              letterSpacing: '0.46px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            Run Check
          </Button>
        </Box>

        {/* Inline prompts + Ask AI row */}
        {hasInlinePrompts && (
          <Box
            sx={{
              bgcolor: 'rgba(63, 81, 181, 0.01)',
              borderTop: 1,
              borderColor: 'divider',
              px: 3,
              py: 1.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexWrap: 'wrap',
              }}
            >
              {inlinePrompts.map((prompt, index) => (
                <Chip
                  key={index}
                  label={prompt.label}
                  size="small"
                  variant="outlined"
                  clickable
                  onClick={() => onInlinePromptClick?.(index)}
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

            <Button
              variant="text"
              size="small"
              startIcon={<ChatOutlinedIcon sx={{ fontSize: '18px !important' }} />}
              onClick={onAskAI}
              sx={{
                color: 'secondary.main',
                fontWeight: 500,
                fontSize: '0.8125rem',
                lineHeight: '22px',
                letterSpacing: '0.46px',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              Ask AI
            </Button>
          </Box>
        )}
      </Card>
    );
  },
);
