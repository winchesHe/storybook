---
title: Storybook for Angular
---

Storybook for Angular is a [framework](../contribute/framework.md) that makes it easy to develop and test UI components in isolation for [Angular](https://angular.io/) applications. It includes:

- 🧱 Uses Angular builders
- 🎛️ Compodoc integration
- 💫 and more!

## Requirements

- Angular >= 14.1.0 < 18.0.0
- Storybook >= 7.x

## Getting started

### In a project without Storybook

Follow the prompts after running this command in your Angular project's root directory:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
   'common/init-command.npx.js.mdx',
   'common/init-command.yarn.js.mdx',
   'common/init-command.pnpm.js.mdx',
  ]}
/>

<!-- prettier-ignore-end -->

[More on getting started with Storybook.](./install.md)

### In a project with Storybook

This framework is designed to work with Storybook 7+. If you’re not already using v7, upgrade with this command:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'common/storybook-upgrade.npm.js.mdx',
    'common/storybook-upgrade.pnpm.js.mdx',
    'common/storybook-upgrade.yarn.js.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

#### Automatic migration

When running the `upgrade` command above, you should get a prompt asking you to migrate to `@storybook/angular`, which should handle everything for you. In case that auto-migration does not work for your project, refer to the manual migration below.

#### Manual migration

First, install the framework:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'angular/angular-install.npm.js.mdx',
    'angular/angular-install.pnpm.js.mdx',
    'angular/angular-install.yarn.js.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

Then, update your `.storybook/main.js|ts` to change the framework property:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'angular/angular-add-framework.js.mdx',
    'angular/angular-add-framework.ts.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

Finally, update your `angular.json` to include the Storybook builder:

```jsonc
// angular.json
{
  ...
  "projects": {
    ...
    "your-project": {
      ...
      "architect": {
        ...
        "storybook": {
          "builder": "@storybook/angular:start-storybook",
          "options": {
            // The path to the storybook config directory
            "configDir": ".storybook",
            // The build target of your project
            "browserTarget": "your-project:build",
            // The port you want to start Storybook on
            "port": 6006
            // More options available, documented here:
            // https://github.com/storybookjs/storybook/tree/next/code/frameworks/angular/src/builders/start-storybook/schema.json
          }
        },
        "build-storybook": {
          "builder": "@storybook/angular:build-storybook",
          "options": {
            "configDir": ".storybook",
            "browserTarget": "your-project:build",
            "outputDir": "dist/storybook/your-project"
            // More options available, documented here:
            // https://github.com/storybookjs/storybook/tree/next/code/frameworks/angular/src/builders/build-storybook/schema.json
          }
        }
      }
    }
  }
}
```

## Run Storybook

To run Storybook for a particular project, please run:

```sh
ng run <your-project>:storybook
```

To build Storybook, run:

```sh
ng run <your-project>:build-storybook
```

You will find the output in the configured `outputDir` (default is `dist/storybook/<your-project>`).

## Setup Compodoc

You can include JSDoc comments above components, directives, and other parts of your Angular code to include documentation for those elements. Compodoc uses these comments to [generate documentation](../writing-docs/autodocs.md) for your application. In Storybook, it is useful to add explanatory comments above `@Inputs` and `@Outputs`, since these are the main elements that Storybook displays in its user interface. The `@Inputs` and `@Outputs` are the elements that you can interact with in Storybook, such as [controls](../essentials/controls.md).

### Automatic setup

When installing Storybook via `npx storybook@latest init`, you will be given the option to set up Compodoc automatically.

### Manual setup

If you have already installed Storybook, you can set up Compodoc manually.

Install the following dependencies:

```sh
npm install --save-dev @compodoc/compodoc
```

Add the following option to your Storybook Builder:

```jsonc
// angular.json
{
  ...
  "projects": {
    ...
    "your-project": {
      ...
      "architect": {
        ...
        "storybook": {
          "builder": "@storybook/angular:start-storybook",
          "options": {
            ...
            // 👇 Add these
            "compodoc": true,
            "compodocArgs": [
              "-e",
              "json",
              "-d",
              // Where to store the generated documentation. It's usually the root of your Angular project. It's not necessarily the root of your Angular Workspace!
              "."
            ],
          }
        },
        "build-storybook": {
          "builder": "@storybook/angular:build-storybook",
          "options": {
            ...
            // 👇 Add these
            "compodoc": true,
            "compodocArgs": [
              "-e",
              "json",
              "-d",
              "."
            ],
          }
        }
      }
    }
  }
}
```

Go to your `.storybook/preview.js` and add the following:

```js
// .storybook/preview.js
// 👇 Add these
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

// ... rest of file
```

## `applicationConfig` decorator

If your component relies on application-wide providers, like the ones defined by BrowserAnimationsModule or any other modules which use the forRoot pattern to provide a ModuleWithProviders, you can apply the `applicationConfig` [decorator](../writing-stories/decorators.md) to all stories for that component. This will provide them to the [bootstrapApplication function](https://angular.io/guide/standalone-components#configuring-dependency-injection), which is used to bootstrap the component in Storybook.

```ts
// ChipsModule.stories.ts
import { Meta, applicationConfig, StoryObj } from '@storybook/angular';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

import { ChipsModule } from './angular-src/chips.module';

const meta: Meta<ChipsModule> = {
  component: ChipsModule,
  decorators: [
    // Apply application config to all stories
    applicationConfig({
      // List of providers and environment providers that should be available to the root component and all its children.
      providers: [
        ...
        // Import application-wide providers from a module
        importProvidersFrom(BrowserAnimationsModule)
        // Or use provide-style functions if available instead, e.g.
        provideAnimations()
      ],
    }),
  ],
};

export default meta;

type Story = StoryObj<ChipsModule>;

export const WithCustomApplicationProvider: Story = {
  render: () => ({
    // Apply application config to a specific story
    applicationConfig: {
      // The providers will be merged with the ones defined in the applicationConfig decorators providers array of the global meta object
      providers: [...],
    }
  })
}
```

## `moduleMetadata` decorator

If your component has dependencies on other Angular directives and modules, these can be supplied using the `moduleMetadata` [decorator](../writing-stories/decorators.md) either for all stories of a component or for individual stories.

```ts
// YourComponent.stories.ts
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { YourComponent } from './your.component';

const meta: Meta<YourComponent> = {
  component: YourComponent,
  decorators: [
    // Apply metadata to all stories
    moduleMetadata({
      // import necessary ngModules or standalone components
      imports: [...],
      // declare components that are used in the template
      declarations: [...],
      // List of providers that should be available to the root component and all its children.
      providers: [...],
    }),
  ],
};
export default meta;

type Story = StoryObj<YourComponent>;

export const Base: Story = {};

export const WithCustomProvider: Story = {
  decorators: [
    // Apply metadata to a specific story
    moduleMetadata({
      imports: [...],
      declarations: [...],
      providers: [...],
    }),
  ],
};
```

## FAQ

### How do I migrate to an Angular Storybook builder?

The Storybook [Angular builder](https://angular.io/guide/glossary#builder) is a way to run Storybook in an Angular workspace. It is a drop-in replacement for running `storybook dev` and `storybook build` directly.

You can run `npx storybook@next automigrate` to try let Storybook detect and automatically fix your configuration. Otherwise, you can follow the next steps to manually adjust your configuration.

#### Do you have only one Angular project in your workspace?

First, go to your `angular.json` and add `storybook` and `build-storybook` entries in `architect` section of your project like shown above.

Second, adjust your `package.json` script section. Usually, it will look like this:

```jsonc
{
  "scripts": {
    "storybook": "start-storybook -p 6006", // or `storybook dev -p 6006`
    "build-storybook": "build-storybook" // or `storybook build`
  }
}
```

Now, you can run Storybook with `ng run <your-project>:storybook` and build it with `ng run <your-project>:build-storybook`. Adjust the scripts in your `package.json` accordingly.

```json
{
  "scripts": {
    "storybook": "ng run <project-name>:storybook",
    "build-storybook": "ng run <project-name>:build-storybook"
  }
}
```

Also compodoc is now built-in in `@storybook/angular` and you don't have to call it explicitly. If were running compodoc in your `package.json` scripts like this:

```json
{
  "scripts": {
    "docs:json": "compodoc -p tsconfig.json -e json -d ./documentation",
    "storybook": "npm run docs:json && start-storybook -p 6006",
    "build-storybook": "npm run docs:json && build-storybook"
  }
}
```

Change it to:

```json
{
  "scripts": {
    "storybook": "ng run <project-name>:storybook",
    "build-storybook": "ng run <project-name>:build-storybook"
  }
}
```

#### I have multiple projects in my Angular workspace

In this case you have to adjust your `angular.json` and `package.json` as described above for each project in which you want to use Storybook. Please note, that each project should have a dedicated `.storybook` folder, which should be placed in the root of the project.

You can run `npx storybook@latest init` sequentially for each project to setup Storybook for each of them to automatically create the `.storybook` folder and create the necessary configuration in your `angular.json`.

You can then use [Storybook composition](https://storybook.js.org/docs/angular/sharing/storybook-composition) to composite multiple Storybooks into one.

## API

### Options

You can pass an options object for additional configuration if needed:

```js
// .storybook/main.js
import * as path from 'path';

export default {
  // ...
  framework: {
    name: '@storybook/angular',
    options: {
      // ...
    },
  },
};
```

The available options are:

#### `builder`

Type: `Record<string, any>`

Configure options for the [framework's builder](../api/main-config-framework.md#optionsbuilder). For Angular, , available options can be found in the [Webpack builder docs](../builders/webpack.md).
