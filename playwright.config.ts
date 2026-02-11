import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for visual regression tests.
 *
 * Targets the built Storybook served by a local HTTP server.
 * Run `npm run build-storybook` first, then `npx playwright test`.
 */
export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    /* Base URL for the built Storybook (served via http-server or similar) */
    baseURL: 'http://localhost:6006',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'desktop-chrome',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  /* Optionally start a local server to serve the built Storybook */
  webServer: {
    command: 'npx http-server storybook-static --port 6006 --silent',
    port: 6006,
    reuseExistingServer: !process.env.CI,
  },
});
