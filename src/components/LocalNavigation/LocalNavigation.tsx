import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';
import type { StepIconProps } from '@mui/material/StepIcon';

export interface StepItem {
  /** Unique identifier */
  id: string;
  /** Step display label */
  label: string;
}

export interface LocalNavigationProps {
  /** Array of step items to display */
  steps?: StepItem[];
  /** Index of the currently active step (0-based) */
  activeStep?: number;
  /** Callback when a step is clicked */
  onStepClick?: (stepIndex: number) => void;
  /** Width of the navigation panel */
  width?: number;
}

const defaultSteps: StepItem[] = [
  { id: 'project-overview', label: 'Project Overview' },
  { id: 'location-footprint', label: 'Location & Footprint' },
  { id: 'pmst-summary', label: 'PMST Summary' },
  { id: 'impact-pathways', label: 'Impact Pathways' },
  { id: 'significance-screen', label: 'Significance Screen' },
  { id: 'avoidance-mitigation', label: 'Avoidance & Mitigation' },
];

/** Custom connector with a gray dashed line */
const StepperConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.vertical}`]: {
    marginLeft: 19, // center under 40px icon
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderLeftStyle: 'dashed',
    borderLeftWidth: 2,
    borderColor: theme.palette.grey[400],
    minHeight: 24,
  },
}));

/** Custom numbered step icon */
function StepIcon(props: StepIconProps) {
  const { active, completed, icon } = props;

  const isActiveOrCompleted = active || completed;
  return (
    <Box
      sx={{
        width: 36,
        height: 36,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: active ? 'primary.main' : isActiveOrCompleted ? 'grey.500' : 'grey.400',
        color: '#FFFFFF',
        fontWeight: 600,
        fontSize: '0.875rem',
        transition: 'background-color 0.2s',
      }}
    >
      {icon}
    </Box>
  );
}

/**
 * LocalNavigation — A vertical stepper used as secondary navigation
 * within the Self Assessment section of Wayfinder.
 *
 * Shows numbered steps with the active step highlighted in teal.
 */
export const LocalNavigation = React.forwardRef<HTMLDivElement, LocalNavigationProps>(
  function LocalNavigation(
    {
      steps = defaultSteps,
      activeStep = 1,
      onStepClick,
      width = 258,
    },
    ref,
  ) {
    return (
      <Box
        ref={ref}
        component="nav"
        aria-label="Section navigation"
        sx={{
          width,
          minWidth: width,
          height: '100%',
          bgcolor: 'background.paper',
          borderRight: 1,
          borderColor: 'divider',
          py: 4,
          px: 3,
          overflow: 'auto',
        }}
      >
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          connector={<StepperConnector />}
          nonLinear
        >
          {steps.map((step, index) => (
            <Step key={step.id} completed={index < activeStep}>
              <StepLabel
                StepIconComponent={StepIcon}
                onClick={() => onStepClick?.(index)}
                sx={{
                  cursor: 'pointer',
                  '& .MuiStepLabel-label': {
                    fontWeight: index === activeStep ? 700 : 400,
                    color: index === activeStep ? 'text.primary' : 'text.secondary',
                    fontSize: '0.875rem',
                    ml: 1,
                  },
                }}
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    );
  },
);
