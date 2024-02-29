---
title: Storybook for Next.js
---

Storybook for Next.js is a [framework](../contribute/framework.md) that makes it easy to develop and test UI components in isolation for [Next.js](https://nextjs.org/) applications. It includes:

- 🔀 Routing
- 🖼 Image optimization
- ⤵️ Absolute imports
- 🎨 Styling
- 🎛 Webpack & Babel config
- 💫 and more!

## Requirements

- Next.js ≥ 13.5
- Storybook ≥ 7.0

## Getting started

### In a project without Storybook

Follow the prompts after running this command in your Next.js project's root directory:

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

When running the `upgrade` command above, you should get a prompt asking you to migrate to `@storybook/nextjs`, which should handle everything for you. In case that auto-migration does not work for your project, refer to the manual migration below.

#### Manual migration

First, install the framework:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/nextjs-install.npm.js.mdx',
    'react/nextjs-install.pnpm.js.mdx',
    'react/nextjs-install.yarn.js.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

Then, update your `.storybook/main.js|ts` to change the framework property:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/nextjs-add-framework.js.mdx',
    'react/nextjs-add-framework.ts.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

Finally, if you were using Storybook plugins to integrate with Next.js, those are no longer necessary when using this framework and can be removed:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/nextjs-remove-addons.js.mdx',
    'react/nextjs-remove-addons.ts.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

## Next.js's Image component

This framework allows you to use Next.js's [next/image](https://nextjs.org/docs/pages/api-reference/components/image) with no configuration.

### Local images

[Local images](https://nextjs.org/docs/pages/building-your-application/optimizing/images#local-images) are supported.

```jsx
// index.js
import Image from 'next/image';
import profilePic from '../public/me.png';

function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image
        src={profilePic}
        alt="Picture of the author"
        // width={500} automatically provided
        // height={500} automatically provided
        // blurDataURL="../public/me.png" set to equal the image itself (for this framework)
        // placeholder="blur" // Optional blur-up while loading
      />
      <p>Welcome to my homepage!</p>
    </>
  );
}
```

### Remote images

[Remote images](https://nextjs.org/docs/pages/building-your-application/optimizing/images#remote-images) are also supported.

```jsx
// index.js
import Image from 'next/image';

export default function Home() {
  return (
    <>
      <h1>My Homepage</h1>
      <Image src="/me.png" alt="Picture of the author" width={500} height={500} />
      <p>Welcome to my homepage!</p>
    </>
  );
}
```

## Next.js font optimization

[next/font](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) is partially supported in Storybook. The packages `next/font/google` and `next/font/local` are supported.

### `next/font/google`

You don't have to do anything. `next/font/google` is supported out of the box.

### `next/font/local`

For local fonts you have to define the [src](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#local-fonts) property.
The path is relative to the directory where the font loader function is called.

If the following component defines your localFont like this:

```js
// src/components/MyComponent.js
import localFont from 'next/font/local';

const localRubikStorm = localFont({ src: './fonts/RubikStorm-Regular.ttf' });
```

You have to tell Storybook where the `fonts` directory is located, via the [`staticDirs` configuration](../api/main-config-static-dirs.md#with-configuration-objects). The `from` value is relative to the `.storybook` directory. The `to` value is relative to the execution context of Storybook. Very likely it is the root of your project.

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/nextjs-image-static-dirs.js.mdx',
    'react/nextjs-image-static-dirs.ts.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

### Not supported features of `next/font`

The following features are not supported (yet). Support for these features might be planned for the future:

- [Support font loaders configuration in next.config.js](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#local-fonts)
- [fallback](https://nextjs.org/docs/pages/api-reference/components/font#fallback) option
- [adjustFontFallback](https://nextjs.org/docs/pages/api-reference/components/font#adjustfontfallback) option
- [preload](https://nextjs.org/docs/pages/api-reference/components/font#preload) option gets ignored. Storybook handles Font loading its own way.
- [display](https://nextjs.org/docs/pages/api-reference/components/font#display) option gets ignored. All fonts are loaded with display set to "block" to make Storybook load the font properly.

### Mocking fonts during testing

Occasionally fetching fonts from Google may fail as part of your Storybook build step. It is highly recommended to mock these requests, as those failures can cause your pipeline to fail as well. Next.js [supports mocking fonts](https://github.com/vercel/next.js/blob/725ddc7371f80cca273779d37f961c3e20356f95/packages/font/src/google/fetch-css-from-google-fonts.ts#L36) via a JavaScript module located where the env var `NEXT_FONT_GOOGLE_MOCKED_RESPONSES` references.

For example, using [GitHub Actions](https://www.chromatic.com/docs/github-actions):

```yaml
# .github/workflows/ci.yml
- uses: chromaui/action@v1
  env:
    #👇 the location of mocked fonts to use
    NEXT_FONT_GOOGLE_MOCKED_RESPONSES: ${{ github.workspace }}/mocked-google-fonts.js
  with:
    projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
    token: ${{ secrets.GITHUB_TOKEN }}
```

Your mocked fonts will look something like this:

```js
// mocked-google-fonts.js
//👇 Mocked responses of google fonts with the URL as the key
module.exports = {
  'https://fonts.googleapis.com/css?family=Inter:wght@400;500;600;800&display=block': `
    /* cyrillic-ext */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-display: block;
      src: url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZJhiJ-Ek-_EeAmM.woff2) format('woff2');
      unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
    }
    /* more font declarations go here */
    /* latin */
    @font-face {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-display: block;
      src: url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }`,
};
```

## Next.js routing

[Next.js's router](https://nextjs.org/docs/pages/building-your-application/routing) is automatically stubbed for you so that when the router is interacted with, all of its interactions are automatically logged to the Actions panel if you have the [Storybook actions addon](../essentials/actions.md).

<Callout>

You should only use `next/router` in the `pages` directory. In the `app` directory, it is necessary to use `next/navigation`.

</Callout>

### Overriding defaults

Per-story overrides can be done by adding a `nextjs.router` property onto the story [parameters](../writing-stories/parameters.md). The framework will shallowly merge whatever you put here into the router.

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/nextjs-router-override-in-story.js.mdx',
    'react/nextjs-router-override-in-story.ts.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

<Callout>

These overrides can also be applied to [all stories for a component](../api/parameters.md#meta-parameters) or [all stories in your project](../api/parameters.md#project-parameters). Standard [parameter inheritance](../api/parameters.md#parameter-inheritance) rules apply.

</Callout>

### Default router

The default values on the stubbed router are as follows (see [globals](../essentials/toolbars-and-globals.md#globals) for more details on how globals work).

```ts
// Default router
const defaultRouter = {
  push(...args) {
    action('nextRouter.push')(...args);
    return Promise.resolve(true);
  },
  replace(...args) {
    action('nextRouter.replace')(...args);
    return Promise.resolve(true);
  },
  reload(...args) {
    action('nextRouter.reload')(...args);
  },
  back(...args) {
    action('nextRouter.back')(...args);
  },
  forward() {
    action('nextRouter.forward')();
  },
  prefetch(...args) {
    action('nextRouter.prefetch')(...args);
    return Promise.resolve();
  },
  beforePopState(...args) {
    action('nextRouter.beforePopState')(...args);
  },
  events: {
    on(...args) {
      action('nextRouter.events.on')(...args);
    },
    off(...args) {
      action('nextRouter.events.off')(...args);
    },
    emit(...args) {
      action('nextRouter.events.emit')(...args);
    },
  },
  // The locale should be configured globally: https://storybook.js.org/docs/essentials/toolbars-and-globals#globals
  locale: globals?.locale,
  asPath: '/',
  basePath: '/',
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  isPreview: false,
  route: '/',
  pathname: '/',
  query: {},
};
```

### Actions integration caveats

If you override a function, you lose the automatic action tab integration and have to build it out yourself, which looks something like this (make sure you install the `@storybook/addon-actions` package):

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/nextjs-router-push-override-in-preview.js.mdx',
    'react/nextjs-router-push-override-in-preview.ts.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

## Next.js navigation

<Callout>

Please note that [`next/navigation`](https://nextjs.org/docs/app/building-your-application/routing) can only be used in components/pages in the `app` directory.

</Callout>

### Set `nextjs.appDirectory` to `true`

If your story imports components that use `next/navigation`, you need to set the parameter `nextjs.appDirectory` to `true` in for that component's stories:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/nextjs-app-directory-in-meta.js.mdx',
    'react/nextjs-app-directory-in-meta.ts.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

If your Next.js project uses the `app` directory for every page (in other words, it does not have a `pages` directory), you can set the parameter `nextjs.appDirectory` to `true` in the [`.storybook/preview.js|ts`](../configure/index.md#configure-story-rendering) file to apply it to all stories.

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/nextjs-app-directory-in-preview.js.mdx',
    'react/nextjs-app-directory-in-preview.ts.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

### Overriding defaults

Per-story overrides can be done by adding a `nextjs.navigation` property onto the story [parameters](../writing-stories/parameters.md). The framework will shallowly merge whatever you put here into the router.

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/nextjs-navigation-override-in-story.js.mdx',
    'react/nextjs-navigation-override-in-story.ts.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

<Callout>

These overrides can also be applied to [all stories for a component](../api/parameters.md#meta-parameters) or [all stories in your project](../api/parameters.md#project-parameters). Standard [parameter inheritance](../api/parameters.md#parameter-inheritance) rules apply.

</Callout>

### `useSelectedLayoutSegment`, `useSelectedLayoutSegments`, and `useParams` hooks

The `useSelectedLayoutSegment`, `useSelectedLayoutSegments`, and `useParams` hooks are supported in Storybook. You have to set the `nextjs.navigation.segments` parameter to return the segments or the params you want to use.

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/nextjs-navigation-segments-override-in-meta.js.mdx',
    'react/nextjs-navigation-segments-override-in-meta.ts.mdx'
  ]}
/>

With the above configuration, the component rendered in the stories would receive the following values from the hooks:

```js
// NavigationBasedComponent.js
import { useSelectedLayoutSegment, useSelectedLayoutSegments, useParams } from 'next/navigation';

export default function NavigationBasedComponent() {
  const segment = useSelectedLayoutSegment(); // dashboard
  const segments = useSelectedLayoutSegments(); // ["dashboard", "analytics"]
  const params = useParams(); // {}
  // ...
}
```

<!-- prettier-ignore-end -->

To use `useParams`, you have to use a segments array where each element is an array containing two strings. The first string is the param key and the second string is the param value.

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/nextjs-navigation-segments-for-use-params-override-in-meta.js.mdx',
    'react/nextjs-navigation-segments-for-use-params-override-in-meta.ts.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

With the above configuration, the component rendered in the stories would receive the following values from the hooks:

```js
// ParamsBasedComponent.js
import { useSelectedLayoutSegment, useSelectedLayoutSegments, useParams } from 'next/navigation';

export default function ParamsBasedComponent() {
  const segment = useSelectedLayoutSegment(); // hello
  const segments = useSelectedLayoutSegments(); // ["hello", "nextjs"]
  const params = useParams(); // { slug: "hello", framework: "nextjs" }
  ...
}
```

<Callout>

These overrides can also be applied to [a single story](../api/parameters.md#story-parameters) or [all stories in your project](../api/parameters.md#project-parameters). Standard [parameter inheritance](../api/parameters.md#parameter-inheritance) rules apply.

</Callout>

The default value of `nextjs.navigation.segments` is `[]` if not set.

### Default navigation context

The default values on the stubbed navigation context are as follows:

```ts
// Default navigation context
const defaultNavigationContext = {
  push(...args) {
    action('nextNavigation.push')(...args);
  },
  replace(...args) {
    action('nextNavigation.replace')(...args);
  },
  forward(...args) {
    action('nextNavigation.forward')(...args);
  },
  back(...args) {
    action('nextNavigation.back')(...args);
  },
  prefetch(...args) {
    action('nextNavigation.prefetch')(...args);
  },
  refresh: () => {
    action('nextNavigation.refresh')();
  },
  pathname: '/',
  query: {},
};
```

### Actions integration caveats

If you override a function, you lose the automatic action tab integration and have to build it out yourself, which looks something like this (make sure you install the `@storybook/addon-actions` package):

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/nextjs-navigation-push-override-in-preview.js.mdx',
    'react/nextjs-navigation-push-override-in-preview.ts.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

## Next.js Head

[`next/head`](https://nextjs.org/docs/pages/api-reference/components/head) is supported out of the box. You can use it in your stories like you would in your Next.js application. Please keep in mind, that the Head `children` are placed into the head element of the iframe that Storybook uses to render your stories.

## Sass/Scss

[Global Sass/Scss stylesheets](https://nextjs.org/docs/pages/building-your-application/styling/sass) are supported without any additional configuration as well. Just import them into [`.storybook/preview.js|ts`](../configure/index.md#configure-story-rendering)

```js
// .storybook/preview.js|ts
import '../styles/globals.scss';
```

This will automatically include any of your [custom Sass configurations](https://nextjs.org/docs/pages/building-your-application/styling/sass#customizing-sass-options) in your `next.config.js` file.

```js
// next.config.js
import * as path from 'path';

export default {
  // Any options here are included in Sass compilation for your stories
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
};
```

## CSS/Sass/Scss Modules

[CSS modules](https://nextjs.org/docs/pages/building-your-application/styling/css-modules) work as expected.

```jsx
// src/components/Button.jsx
// This import will work in Storybook
import styles from './Button.module.css';
// Sass/Scss is also supported
// import styles from './Button.module.scss'
// import styles from './Button.module.sass'

export function Button() {
  return (
    <button type="button" className={styles.error}>
      Destroy
    </button>
  );
}
```

## Styled JSX

The built in CSS-in-JS solution for Next.js is [styled-jsx](https://nextjs.org/docs/pages/building-your-application/styling/css-in-js), and this framework supports that out of the box too, zero config.

```jsx
// src/components/HelloWorld.jsx
// This will work in Storybook
function HelloWorld() {
  return (
    <div>
      Hello world
      <p>scoped!</p>
      <style jsx>{`
        p {
          color: blue;
        }
        div {
          background: red;
        }
        @media (max-width: 600px) {
          div {
            background: blue;
          }
        }
      `}</style>
      <style global jsx>{`
        body {
          background: black;
        }
      `}</style>
    </div>
  );
}

export default HelloWorld;
```

You can use your own babel config too. This is an example of how you can customize styled-jsx.

```json
// .babelrc (or whatever config file you use)
{
  "presets": [
    [
      "next/babel",
      {
        "styled-jsx": {
          "plugins": ["@styled-jsx/plugin-sass"]
        }
      }
    ]
  ]
}
```

## PostCSS

Next.js lets you [customize PostCSS config](https://nextjs.org/docs/pages/building-your-application/configuring/post-css). Thus this framework will automatically handle your PostCSS config for you.

This allows for cool things like zero-config Tailwind! (See [Next.js' example](https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss))

## Absolute imports

[Absolute imports](https://nextjs.org/docs/pages/building-your-application/configuring/absolute-imports-and-module-aliases#absolute-imports) from the root directory are supported.

```jsx
// index.js
// All good!
import Button from 'components/button';
// Also good!
import styles from 'styles/HomePage.module.css';

export default function HomePage() {
  return (
    <>
      <h1 className={styles.title}>Hello World</h1>
      <Button />
    </>
  );
}
```

Also OK for global styles in `.storybook/preview.js|ts`!

```js
// .storybook/preview.js|ts

import 'styles/globals.scss';

// ...
```

## Runtime config

Next.js allows for [Runtime Configuration](https://nextjs.org/docs/pages/api-reference/next-config-js/runtime-configuration) which lets you import a handy `getConfig` function to get certain configuration defined in your `next.config.js` file at runtime.

In the context of Storybook with this framework, you can expect Next.js's [Runtime Configuration](https://nextjs.org/docs/pages/api-reference/next-config-js/runtime-configuration) feature to work just fine.

Note, because Storybook doesn't server render your components, your components will only see what they normally see on the client side (i.e. they won't see `serverRuntimeConfig` but will see `publicRuntimeConfig`).

For example, consider the following Next.js config:

```js
// next.config.js
module.exports = {
  serverRuntimeConfig: {
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    staticFolder: '/static',
  },
};
```

Calls to `getConfig` would return the following object when called within Storybook:

```json
// Runtime config
{
  "serverRuntimeConfig": {},
  "publicRuntimeConfig": {
    "staticFolder": "/static"
  }
}
```

## Custom Webpack config

Next.js comes with a lot of things for free out of the box like Sass support, but sometimes you add [custom Webpack config modifications to Next.js](https://nextjs.org/docs/pages/api-reference/next-config-js/webpack). This framework takes care of most of the Webpack modifications you would want to add. If Next.js supports a feature out of the box, then that feature will work out of the box in Storybook. If Next.js doesn't support something out of the box, but makes it easy to configure, then this framework will do the same for that thing for Storybook.

Any Webpack modifications desired for Storybook should be made in [`.storybook/main.js|ts`](../builders/webpack.md#extending-storybooks-webpack-config).

Note: Not all Webpack modifications are copy/paste-able between `next.config.js` and `.storybook/main.js|ts`. It is recommended to do your research on how to properly make your modification to Storybook's Webpack config and on how [Webpack works](https://webpack.js.org/concepts/).

Below is an example of how to add SVGR support to Storybook with this framework.

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/nextjs-configure-svgr.js.mdx',
    'react/nextjs-configure-svgr.ts.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

## Typescript

Storybook handles most [Typescript](https://www.typescriptlang.org/) configurations, but this framework adds additional support for Next.js's support for [Absolute Imports and Module path aliases](https://nextjs.org/docs/pages/building-your-application/configuring/absolute-imports-and-module-aliases). In short, it takes into account your `tsconfig.json`'s [baseUrl](https://www.typescriptlang.org/tsconfig#baseUrl) and [paths](https://www.typescriptlang.org/tsconfig#paths). Thus, a `tsconfig.json` like the one below would work out of the box.

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/components/*": ["components/*"]
    }
  }
}
```

## React Server Components (RSC)

(⚠️ **Experimental**)

If your app uses [React Server Components (RSC)](https://nextjs.org/docs/app/building-your-application/rendering/server-components), Storybook can render them in stories in the browser.

To enable this set the `experimentalRSC` feature flag in your `.storybook/main.js|ts` config:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/rsc-feature-flag.js.mdx',
    'react/rsc-feature-flag.ts.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

Setting this flag automatically wraps your story in a [Suspense](https://react.dev/reference/react/Suspense) wrapper, which is able to render asynchronous components in NextJS's version of React.

If this wrapper causes problems in any of your existing stories, you can selectively disable it using the `react.rsc` [parameter](https://storybook.js.org/docs/writing-stories/parameters) at the global/component/story level:

<!-- prettier-ignore-start -->

<CodeSnippets
  paths={[
    'react/rsc-parameter-in-meta.js.mdx',
    'react/rsc-parameter-in-meta.ts.mdx'
  ]}
/>

<!-- prettier-ignore-end -->

Note that wrapping your server components in Suspense does not help if your server components access server-side resources like the file system or Node-specific libraries. To work around this, you'll need to mock out your data access layer using [Webpack aliases](https://webpack.js.org/configuration/resolve/#resolvealias) or an addon like [storybook-addon-module-mock](https://storybook.js.org/addons/storybook-addon-module-mock).

If your server components access data via the network, we recommend using the [MSW Storybook Addon](https://storybook.js.org/addons/msw-storybook-addon) to mock network requests.

In the future we will provide better mocking support in Storybook and support for [Server Actions](https://nextjs.org/docs/app/api-reference/functions/server-actions).

## Notes for Yarn v2 and v3 users

If you're using [Yarn](https://yarnpkg.com/) v2 or v3, you may run into issues where Storybook can't resolve `style-loader` or `css-loader`. For example, you might get errors like:

```
Module not found: Error: Can't resolve 'css-loader'
Module not found: Error: Can't resolve 'style-loader'
```

This is because those versions of Yarn have different package resolution rules than Yarn v1.x. If this is the case for you, please install the package directly.

## FAQ

### Stories for pages/components which fetch data

Next.js pages can fetch data directly within server components in the `app` directory, which often include module imports that only run in a node environment. This does not (currently) work within Storybook, because if you import from a Next.js page file containing those node module imports in your stories, your Storybook's Webpack will crash because those modules will not run in a browser. To get around this, you can extract the component in your page file into a separate file and import that pure component in your stories. Or, if that's not feasible for some reason, you can [polyfill those modules](https://webpack.js.org/configuration/node/) in your Storybook's [`webpackFinal` configuration](../builders/webpack.md#extending-storybooks-webpack-config).

**Before**

```jsx
// app/my-page/index.jsx
async function getData() {
  const res = await fetch(...);
  // ...
}

// Using this component in your stories will break the Storybook build
export default async function Page() {
  const data = await getData();

  return // ...
}
```

**After**

```jsx
// app/my-page/index.jsx

// Use this component in your stories
import MyPage from './components/MyPage';

async function getData() {
  const res = await fetch(...);
  // ...
}

export default async function Page() {
  const data = await getData();

  return <MyPage {...data} />;
}
```

### Statically imported images won't load

Make sure you are treating image imports the same way you treat them when using `next/image` in normal development.

Before using this framework, image imports would import the raw path to the image (e.g. `'static/media/stories/assets/logo.svg'`). Now image imports work the "Next.js way", meaning that you now get an object when importing an image. For example:

```json
// Image import object
{
  "src": "static/media/stories/assets/logo.svg",
  "height": 48,
  "width": 48,
  "blurDataURL": "static/media/stories/assets/logo.svg"
}
```

Therefore, if something in Storybook isn't showing the image properly, make sure you expect the object to be returned from an import instead of only the asset path.

See [local images](https://nextjs.org/docs/pages/building-your-application/optimizing/images#local-images) for more detail on how Next.js treats static image imports.

### Module not found: Error: Can't resolve `package name`

You might get this if you're using Yarn v2 or v3. See [Notes for Yarn v2 and v3 users](#notes-for-yarn-v2-and-v3-users) for more details.

### What if I'm using the Vite builder?

The `@storybook/nextjs` package abstracts the Webpack 5 builder and provides all the necessary Webpack configuration needed (and used internally) by Next.js. Webpack is currently the official builder in Next.js, and Next.js does not support Vite, therefore it is not possible to use Vite with `@storybook/nextjs`. You can use `@storybook/react-vite` framework instead, but at the cost of having a degraded experience, and we won't be able to provide you official support.

## API

### Parameters

This framework contributes the following [parameters](../writing-stories/parameters.md) to Storybook, under the `nextjs` namespace:

#### `appDirectory`

Type: `boolean`

Default: `false`

If your story imports components that use `next/navigation`, you need to set the parameter `nextjs.appDirectory` to `true`. Because this is a parameter, you can apply it to a [single story](../api/parameters.md#story-parameters), [all stories for a component](../api/parameters.md#meta-parameters), or [every story in your Storybook](../api/parameters.md#project-parameters). See [Next.js Navigation](#nextjs-navigation) for more details.

#### `navigation`

Type:

```ts
{
  asPath?: string;
  pathname?: string;
  query?: Record<string, string>;
  segments?: (string | [string, string])[];
}
```

Default value:

```js
{
  segments: [];
}
```

The router object that is passed to the `next/navigation` context. See [Next.js's navigation docs](https://nextjs.org/docs/app/building-your-application/routing) for more details.

#### `router`

Type:

```ts
{
  asPath?: string;
  pathname?: string;
  query?: Record<string, string>;
}
```

The router object that is passed to the `next/router` context. See [Next.js's router docs](https://nextjs.org/docs/pages/building-your-application/routing) for more details.

### Options

You can pass an options object for additional configuration if needed:

```js
// .storybook/main.js
import * as path from 'path';

export default {
  // ...
  framework: {
    name: '@storybook/nextjs',
    options: {
      image: {
        loading: 'eager',
      },
      nextConfigPath: path.resolve(__dirname, '../next.config.js'),
    },
  },
};
```

The available options are:

#### `builder`

Type: `Record<string, any>`

Configure options for the [framework's builder](../api/main-config-framework.md#optionsbuilder). For Next.js, available options can be found in the [Webpack builder docs](../builders/webpack.md).

#### `image`

Type: `object`

Props to pass to every instance of `next/image`. See [next/image docs](https://nextjs.org/docs/pages/api-reference/components/image) for more details.

#### `nextConfigPath`

Type: `string`

The absolute path to the `next.config.js` file. This is necessary if you have a custom `next.config.js` file that is not in the root directory of your project.
