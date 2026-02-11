import type { Preview } from '@storybook/react-vite';
import type { ReactRenderer } from '@storybook/react-vite';
import type { DecoratorFunction } from 'storybook/internal/types';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/public-sans/400.css';
import '@fontsource/public-sans/500.css';
import '@fontsource/public-sans/600.css';
import '@fontsource/public-sans/700.css';
import { lightTheme, darkTheme } from '../src/theme';

/**
 * Decorator that wraps every story in the DCCEEW MUI ThemeProvider.
 * Reads the `theme` global to toggle between light and dark.
 */
const withThemeProvider: DecoratorFunction<ReactRenderer> = (Story, context) => {
  const selectedTheme = context.globals?.theme === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};

const preview: Preview = {
  decorators: [withThemeProvider],

  globalTypes: {
    theme: {
      description: 'Toggle light/dark theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },

  initialGlobals: {
    theme: 'light',
  },

  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' — show a11y violations in test UI only
      // 'error' — fail CI on a11y violations
      // 'off' — skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
