import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export interface WayfinderAppBarProps {
  /** Application title displayed in the appbar */
  title?: string;
  /** Whether the global sidebar is currently open */
  sidebarOpen?: boolean;
  /** Current document status label shown as a chip (omit to hide) */
  statusLabel?: string;
  /** Callback when the hamburger menu icon is clicked */
  onMenuClick?: () => void;
  /** Callback when the "Save Progress" button is clicked (omit to hide) */
  onSaveProgress?: () => void;
  /** Callback when the overflow (more) button is clicked (omit to hide) */
  onMoreClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Optional content rendered on the right side of the appbar (e.g. user avatar) */
  endSlot?: React.ReactNode;
}

/**
 * WayfinderAppBar — The top application bar for the Wayfinder application.
 *
 * Features a dark teal background with topographic contour pattern,
 * hamburger menu toggle, title, and flexible right-side content.
 *
 * The menu icon changes based on `sidebarOpen`:
 * - Open → `MenuOpenIcon` (indicates sidebar can be collapsed)
 * - Closed → `MenuIcon` (standard hamburger)
 */
export const WayfinderAppBar = React.forwardRef<HTMLDivElement, WayfinderAppBarProps>(
  function WayfinderAppBar(
    {
      title = 'Wayfinder',
      sidebarOpen = true,
      statusLabel,
      onMenuClick,
      onSaveProgress,
      onMoreClick,
      endSlot,
    },
    ref,
  ) {
    const hasActions = statusLabel || onSaveProgress || onMoreClick;

    return (
      <AppBar
        ref={ref}
        position="static"
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #0F3A41 0%, #146D6E 50%, #0F3A41 100%)',
          height: 64,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          // Subtle topographic pattern via repeating radial gradient
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            opacity: 0.08,
            backgroundImage: `
              repeating-radial-gradient(circle at 20% 50%, transparent 0, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 42px),
              repeating-radial-gradient(circle at 80% 30%, transparent 0, transparent 60px, rgba(255,255,255,0.04) 60px, rgba(255,255,255,0.04) 62px),
              repeating-radial-gradient(circle at 50% 80%, transparent 0, transparent 80px, rgba(255,255,255,0.03) 80px, rgba(255,255,255,0.03) 82px)
            `,
            pointerEvents: 'none',
          },
        }}
      >
        <Toolbar sx={{ minHeight: 64, px: 2 }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label={sidebarOpen ? 'Collapse navigation' : 'Expand navigation'}
            onClick={onMenuClick}
            sx={{ mr: 1 }}
          >
            {sidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 500,
              letterSpacing: '0.15px',
              flexGrow: 1,
            }}
          >
            {title}
          </Typography>

          {/* Right-side content */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            {hasActions && (
              <>
                {statusLabel && (
                  <Chip
                    label={statusLabel}
                    size="small"
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      height: 28,
                      borderRadius: 1,
                    }}
                  />
                )}

                {onSaveProgress && (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={onSaveProgress}
                    sx={{
                      color: '#FFFFFF',
                      borderColor: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      '&:hover': {
                        borderColor: '#FFFFFF',
                        bgcolor: 'rgba(255, 255, 255, 0.08)',
                      },
                    }}
                  >
                    Save Progress
                  </Button>
                )}

                {onMoreClick && (
                  <IconButton
                    color="inherit"
                    aria-label="More options"
                    onClick={onMoreClick}
                    size="small"
                  >
                    <MoreVertIcon />
                  </IconButton>
                )}
              </>
            )}

            {endSlot}
          </Box>
        </Toolbar>
      </AppBar>
    );
  },
);
