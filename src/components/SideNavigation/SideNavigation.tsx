import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

/** Duration (ms) for the sidebar expand/collapse animation. */
export const SIDEBAR_TRANSITION_DURATION = 225;

export interface NavItem {
  /** Unique identifier for the nav item */
  id: string;
  /** Display label */
  label: string;
  /** Icon element to display */
  icon?: React.ReactNode;
}

export interface SideNavigationProps {
  /** Array of navigation items */
  items?: NavItem[];
  /** Currently active item id */
  activeId?: string;
  /** Whether the sidebar is expanded */
  open?: boolean;
  /** Callback when a nav item is clicked */
  onItemClick?: (id: string) => void;
  /** Width of the sidebar when expanded */
  width?: number;
}

const defaultNavItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <DashboardOutlinedIcon /> },
  { id: 'self-assessment', label: 'Self Assessment', icon: <AssignmentOutlinedIcon /> },
  { id: 'documents', label: 'Documents', icon: <DescriptionOutlinedIcon /> },
  { id: 'services', label: 'Services', icon: <AccountBalanceOutlinedIcon /> },
  { id: 'guidelines', label: 'Guidelines', icon: <TuneOutlinedIcon /> },
  { id: 'support', label: 'Support', icon: <HelpOutlineOutlinedIcon /> },
];

/**
 * SideNavigation — The primary navigation sidebar for the Wayfinder application.
 *
 * Displays a vertical list of navigation items with icons. The active item
 * is highlighted with a teal accent.
 *
 * Supports an `open` prop that animates the sidebar in/out. When closed the
 * sidebar collapses to zero width and the main content pushes into the space.
 */
export const SideNavigation = React.forwardRef<HTMLDivElement, SideNavigationProps>(
  function SideNavigation(
    {
      items = defaultNavItems,
      activeId = 'self-assessment',
      open = true,
      onItemClick,
      width = 280,
    },
    ref,
  ) {
    return (
      <Box
        ref={ref}
        component="nav"
        aria-label="Main navigation"
        sx={{
          width: open ? width : 0,
          minWidth: open ? width : 0,
          height: '100%',
          bgcolor: 'background.paper',
          borderRight: open ? 1 : 0,
          borderColor: 'divider',
          overflow: 'hidden',
          transition: (theme) =>
            theme.transitions.create(['width', 'min-width', 'border-right-width'], {
              easing: theme.transitions.easing.sharp,
              duration: SIDEBAR_TRANSITION_DURATION,
            }),
        }}
      >
        <List
          disablePadding
          sx={{
            pt: 1,
            // Keep content at full width during animation to avoid text wrapping
            width,
            minWidth: width,
          }}
        >
          {items.map((item) => {
            const isActive = item.id === activeId;
            return (
              <ListItemButton
                key={item.id}
                selected={isActive}
                onClick={() => onItemClick?.(item.id)}
                sx={{
                  py: 1.5,
                  px: 3,
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    borderRight: 3,
                    borderColor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.light',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: isActive ? 600 : 400,
                    noWrap: true,
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    );
  },
);
