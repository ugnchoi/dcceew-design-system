import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';

export interface GuidanceListItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional detail content shown when expanded */
  detail?: string;
}

export interface GuidanceSection {
  /** Section title (e.g. "Referral signals") */
  title: string;
  /** List of items in this section */
  items: GuidanceListItem[];
}

export interface AIGuidanceProps {
  /** Completeness percentage (0-100) */
  completeness?: number;
  /** Sections of guidance items to display */
  sections?: GuidanceSection[];
  /** Label for the next best step */
  nextBestStep?: string;
  /** Callback when "Run Check" is clicked */
  onRunCheck?: () => void;
  /** Callback when "Next best step" is clicked */
  onNextBestStep?: () => void;
  /** Callback when a list item is clicked */
  onItemClick?: (sectionIndex: number, itemId: string) => void;
}

const defaultSections: GuidanceSection[] = [
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
];

/**
 * AIGuidance — A sidebar panel showing AI-powered guidance for assessment completion.
 *
 * Displays a completeness progress bar, referral signals, discrepancy checks,
 * and a "next best step" recommendation.
 */
export const AIGuidance = React.forwardRef<HTMLDivElement, AIGuidanceProps>(
  function AIGuidance(
    {
      completeness = 50,
      sections = defaultSections,
      nextBestStep = 'Next best step',
      onRunCheck,
      onNextBestStep,
      onItemClick,
    },
    ref,
  ) {
    return (
      <Card
        ref={ref}
        variant="outlined"
        sx={{
          borderRadius: 3,
          border: 1,
          borderColor: 'divider',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <CardContent sx={{ pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
              AI Guidance
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={onRunCheck}
              sx={{
                fontWeight: 600,
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Run Check
            </Button>
          </Box>

          {/* Completeness progress */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Completeness
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <LinearProgress
                variant="determinate"
                value={completeness}
                sx={{
                  flex: 1,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: 'grey.200',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    bgcolor: 'secondary.main',
                  },
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, minWidth: 36 }}>
                {completeness}%
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <Divider />

        {/* Guidance sections */}
        {sections.map((section, sectionIndex) => (
          <React.Fragment key={section.title}>
            <CardContent sx={{ pb: 0, pt: 2, '&:last-child': { pb: 0 } }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
                {section.title}
              </Typography>
            </CardContent>
            <List disablePadding>
              {section.items.map((item) => (
                <ListItemButton
                  key={item.id}
                  onClick={() => onItemClick?.(sectionIndex, item.id)}
                  sx={{
                    py: 1,
                    px: 3,
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      variant: 'body2',
                      color: 'text.primary',
                    }}
                  />
                  <ExpandMoreIcon sx={{ color: 'action.active', fontSize: 20 }} />
                </ListItemButton>
              ))}
            </List>
            <Divider />
          </React.Fragment>
        ))}

        {/* Next best step */}
        <Box
          sx={{
            bgcolor: '#F8F8FF',
            px: 3,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            '&:hover': {
              bgcolor: '#F0F0FF',
            },
          }}
          onClick={onNextBestStep}
          role="button"
          tabIndex={0}
          aria-label={nextBestStep}
        >
          <TipsAndUpdatesOutlinedIcon
            sx={{
              color: 'secondary.main',
              fontSize: 22,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: 'secondary.main',
              fontWeight: 500,
            }}
          >
            {nextBestStep}
          </Typography>
        </Box>
      </Card>
    );
  },
);
