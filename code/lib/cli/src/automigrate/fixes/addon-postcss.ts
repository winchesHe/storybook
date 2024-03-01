import chalk from 'chalk';
import { dedent } from 'ts-dedent';
import type { Fix } from '../types';
import { getAddonNames } from '../helpers/mainConfigFile';

interface AddonPostcssRunOptions {
  hasAddonPostcss: boolean;
}

export const addonPostCSS: Fix<AddonPostcssRunOptions> = {
  id: 'addon-postcss',

  versionRange: ['<7', '>=7'],

  promptType: 'notification',

  async check({ mainConfig }) {
    const addons = getAddonNames(mainConfig);
    const hasAddonPostcss = !!addons.find((addon) => addon.includes('@storybook/addon-postcss'));

    if (!hasAddonPostcss) {
      return null;
    }

    return { hasAddonPostcss: true };
  },

  prompt() {
    return dedent`
      ${chalk.bold(
        'Attention'
      )}: We've detected that you're using the following package which are incompatible with Storybook 8 and beyond:

      - ${chalk.cyan(`@storybook/addon-postcss`)}
      
      Please migrate to ${chalk.cyan(
        `@storybook/addon-styling-webpack`
      )} once you're done upgrading.
    `;
  },
};
