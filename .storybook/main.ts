import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',

  // Strip plugins that are only needed for the library build, not Storybook
  async viteFinal(config) {
    config.plugins = (config.plugins ?? []).filter((plugin) => {
      if (plugin && typeof plugin === 'object' && 'name' in plugin) {
        // vite-plugin-dts triggers api-extractor which is unnecessary for Storybook
        return plugin.name !== 'vite:dts';
      }
      return true;
    });
    return config;
  },
};
export default config;