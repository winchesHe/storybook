import { dedent } from 'ts-dedent';
import type { Fix } from '../types';
import findUp from 'find-up';

interface Webpack5RunOptions {
  plugins: string[];
  existed: boolean;
}

export const viteConfigFile = {
  id: 'viteConfigFile',

  async check({ mainConfig, packageManager }) {
    const viteConfigPath = await findUp('vite.config.js');

    const rendererToVitePluginMap: Record<string, string> = {
      preact: '@preact/preset-vite',
      qwik: 'vite-plugin-qwik',
      react: '@vitejs/plugin-react',
      solid: 'vite-plugin-solid',
      svelte: '@sveltejs/vite-plugin-svelte',
      vue: '@vitejs/plugin-vue',
    };

    // TODO: cleanup this logic
    const frameworkName =
      typeof mainConfig.framework === 'string' ? mainConfig.framework : mainConfig.framework?.name;
    const isUsingViteBuilder =
      mainConfig.core?.builder === 'vite' ||
      frameworkName?.includes('vite') ||
      frameworkName === 'qwik' ||
      frameworkName === 'sveltekit' ||
      frameworkName === 'solid';

    const rendererName = (mainConfig.core?.renderer || frameworkName?.split('-')[0]) as string;

    if (!viteConfigPath && isUsingViteBuilder) {
      const plugins = [];

      if (rendererToVitePluginMap[rendererName]) {
        plugins.push(rendererToVitePluginMap[rendererName]);
      }

      return {
        plugins,
        existed: !!viteConfigPath,
      };
    }

    const plugin = rendererToVitePluginMap[rendererName];
    const pluginVersion = await packageManager.getPackageVersion(plugin);

    if (viteConfigPath && isUsingViteBuilder && !pluginVersion) {
      const plugins = [];

      if (plugin) {
        plugins.push(plugin);
      }

      return {
        plugins,
        existed: !!viteConfigPath,
      };
    }

    return null;
  },

  prompt({ existed, plugins }) {
    if (existed) {
      return dedent`
        Storybook 8.0.0 no longers ships with a vite config build-in.
        We've detected you do have a vite config, but you may be missing the following plugins in it.

        ${plugins.map((plugin) => `  - ${plugin}`).join('\n')}

        If you do already have these plugins, you can ignore this message.

        You can find more information on how to do this here:
        https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#framework-specific-vite-plugins-have-to-be-explicitly-added  

        This change was necessary to support newer versions of vite.
      `;
    }
    return dedent`
      Storybook 8.0.0 no longers ships with a vite config build-in.
      Please add a vite.config.js file to your project root.

      You can find more information on how to do this here:
      https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#framework-specific-vite-plugins-have-to-be-explicitly-added

      This change was necessary to support newer versions of vite.
    `;
  },
} satisfies Fix<Webpack5RunOptions>;
