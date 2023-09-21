/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// const users = require('./showcase.json');
const versions = require('./versions.json');

const lastVersion = versions[0];
const copyright = `Copyright © ${new Date().getFullYear()} - DIGITAL.AI, ALL RIGHTS RESERVED`;

const commonDocsOptions = {
  breadcrumbs: false,
  showLastUpdateAuthor: false,
  showLastUpdateTime: true,
  // editUrl:
  //   'https://github.com/facebook/react-native-website/blob/main/website/',
  remarkPlugins: [require('@react-native-website/remark-snackplayer')],
};

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Digital.ai Release',
  tagline:
    'Find answers to your technical questions and learn how to use our products',
  organizationName: 'digital.ai',
  projectName: 'docs-release',
  url: 'https://stage.docs.digital.ai',
  baseUrl: '/release/',
  clientModules: [
    require.resolve('./modules/snackPlayerInitializer.js'),
    require.resolve('./modules/jumpToFragment.js'),
  ],
  trailingSlash: false, // because trailing slashes can break some existing relative links
  scripts: [
    {
      src: 'https://cdn.jsdelivr.net/npm/focus-visible@5.2.0/dist/focus-visible.min.js',
      defer: true,
    },
    // {
    //   src: 'https://widget.surveymonkey.com/collect/website/js/tRaiETqnLgj758hTBazgd8ryO5qrZo8Exadq9qmt1wtm4_2FdZGEAKHDFEt_2BBlwwM4.js',
    //   defer: true,
    // },
    // {src: 'https://snack.expo.dev/embed.js', defer: true},
  ],
  favicon: 'img/favicon.ico',
  titleDelimiter: '·',
  // customFields: {
  //   users,
  //   facebookAppId: '1677033832619985',
  // },
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  onBrokenLinks: 'ignore',
  webpack: {
    jsLoader: isServer => ({
      loader: require.resolve('esbuild-loader'),
      options: {
        loader: 'tsx',
        format: isServer ? 'cjs' : undefined,
        target: isServer ? 'node12' : 'es2017',
      },
    }),
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.json'),
          editCurrentVersion: true,
          onlyIncludeVersions:
            process.env.PREVIEW_DEPLOY === 'true'
              ? ['current', ...versions.slice(0, 2)]
              : undefined,
          versions: {
            [lastVersion]: {
              badge: true, // Do not show version badge for last RN version
            },
          },
          ...commonDocsOptions,
        },
        blog: false,
        // blog: {
        //   path: 'blog',
        //   blogSidebarCount: 'ALL',
        //   blogSidebarTitle: 'All Blog Posts',
        //   feedOptions: {
        //     type: 'all',
        //     copyright,
        //   },
        // },
        theme: {
          customCss: [
            require.resolve('./src/css/customTheme.scss'),
            require.resolve('./src/css/index.scss'),
            // require.resolve('./src/css/showcase.scss'),
            require.resolve('./src/css/versions.scss'),
            require.resolve('./src/css/mdb.min.scss'),
          ],
        },
        // TODO: GA is deprecated, remove once we're sure data is streaming in GA4 via gtag.
        // googleAnalytics: {
        //   trackingID: 'UA-41298772-2',
        // },
        // gtag: {
        //   trackingID: 'G-58L13S6BDP',
        // },
      }),
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
    // [
    //   'content-docs',
    //   /** @type {import('@docusaurus/plugin-content-docs').Options} */
    //   ({
    //     id: 'architecture',
    //     path: 'architecture',
    //     routeBasePath: '/architecture',
    //     sidebarPath: require.resolve('./sidebarsArchitecture.json'),
    //     ...commonDocsOptions,
    //   }),
    // ],
    // [
    //   'content-docs',
    //   /** @type {import('@docusaurus/plugin-content-docs').Options} */
    //   ({
    //     id: 'contributing',
    //     path: 'contributing',
    //     routeBasePath: '/contributing',
    //     sidebarPath: require.resolve('./sidebarsContributing.json'),
    //     ...commonDocsOptions,
    //   }),
    // ],
    // [
    //   'content-docs',
    //   /** @type {import('@docusaurus/plugin-content-docs').Options} */
    //   ({
    //     id: 'community',
    //     path: 'community',
    //     routeBasePath: '/community',
    //     sidebarPath: require.resolve('./sidebarsCommunity.json'),
    //     ...commonDocsOptions,
    //   }),
    // ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: ['appInstalled', 'queryString'],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/pwa/manifest-icon-512.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#20232a',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#20232a',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: '/img/pwa/manifest-icon-512.png',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: '/img/pwa/manifest-icon-512.png',
            color: '#06bcee',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            href: '/img/pwa/manifest-icon-512.png',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#20232a',
          },
        ],
      },
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'light',
        disableSwitch: true,
      },
      announcementBar: {
        id: 'support_ukraine',
        content:
          '<a target="_blank" href="https://devopsai-my.sharepoint.com/:p:/g/personal/rjanarthanan_digital_ai/EZCAc8-0hCtCiVXAE9ZIiF8BgNF1foc76rbOOmME_DCMYQ?e=9ev1lb">Project Phoenix</a>',
        backgroundColor: '#20232a',
        textColor: '#fff',
        isCloseable: true,
      },
      prism: {
        defaultLanguage: 'jsx',
        theme: require('./core/PrismTheme'),
        additionalLanguages: [
          'java',
          'kotlin',
          'objectivec',
          'swift',
          'groovy',
          'ruby',
          'flow',
        ],
      },
      navbar: {
        logo: {
          src: 'img/header_logo.svg',
          alt: 'digital.ai',
          href: 'https://stage.docs.digital.ai',
          target: '_self',
        },
        style: 'primary',
        items: [
          {
            label: 'Product Pages',
            type: 'dropdown',
            position: 'right',
            items: [
              {
                label: 'Platform',
                to: 'https://stage.docs.digital.ai/platform/',
                target: '_self',
              },
              {
                label: 'Agility',
                to: 'https://stage.docs.digital.ai/agility/',
                target: '_self',
              },
              {
                label: 'Deploy',
                to: 'https://stage.docs.digital.ai/deploy/',
                target: '_self',
              },
              {
                label: 'App Management',
                to: 'https://stage.docs.digital.ai/appmanagement/',
                target: '_self',
              },
              {
                label: 'Intelligence',
                to: 'https://stage.docs.digital.ai/intelligence/',
                target: '_self',
              },
              {
                label: 'Continuous Testing',
                to: 'https://stage.docs.digital.ai/continuostesting/',
                target: '_self',
              },
              {
                label: 'TeamForge',
                to: 'https://stage.docs.digital.ai/teamforge/',
                target: '_self',
              },
              {
                label: 'App Security',
                to: 'https://stage.docs.digital.ai/appsecurity/',
                target: '_self',
              },
              // {
              //   label: 'Deploy',
              //   type: 'doc',
              //   docId: 'getting-started',
              // },
              // {
              //   label: 'Agility',
              //   type: 'doc',
              //   docId: 'getting-started',
              // },
              // {
              //   label: 'App Security',
              //   type: 'doc',
              //   docId: 'components-and-apis',
              // },
              // {
              //   label: 'Continuous Testing',
              //   type: 'doc',
              //   docId: 'accessibilityinfo',
              // },
              // {
              //   label: 'Intelligence',
              //   type: 'doc',
              //   docId: 'architecture-overview',
              //   docsPluginId: 'architecture',
              // },
            ],
          },
          // {
          //   type: 'doc',
          //   docId: 'overview',
          //   label: 'Contributing',
          //   position: 'right',
          //   docsPluginId: 'contributing',
          // },
          // {
          //   type: 'doc',
          //   docId: 'overview',
          //   label: 'Community',
          //   position: 'right',
          //   docsPluginId: 'community',
          // },
          {
            href: 'https://digitalai.us.digital.ai/signin/docs?redirect=https%3A%2F%2Fdocs.digital.ai%2F',
            label: 'Login',
            position: 'right',
          },
          // {
          //   to: '/blog',
          //   label: 'Blog',
          //   position: 'right',
          // },
          {
            type: 'docsVersionDropdown',
            position: 'left',
            dropdownActiveClassDisabled: true,
            dropdownItemsAfter: [
              {
                to: '/versions',
                label: 'All versions',
              },
            ],
          },
          // {
          //   href: 'https://github.com/facebook/react-native',
          //   'aria-label': 'GitHub repository',
          //   position: 'right',
          //   className: 'navbar-github-link',
          // },
        ],
      },
      image: 'img/logo-og.png',
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: 'Develop',
          //   items: [
          //     {
          //       label: 'Guides',
          //       to: 'docs/getting-started',
          //     },
          //     {
          //       label: 'Components',
          //       to: 'docs/components-and-apis',
          //     },
          //     {
          //       label: 'APIs',
          //       to: 'docs/accessibilityinfo',
          //     },
          //     {
          //       label: 'Architecture',
          //       to: 'architecture/overview',
          //     },
          //   ],
          // },
          {
            title: 'Participate',
            items: [
              // {
              //   label: 'Showcase',
              //   to: 'showcase',
              // },
              // {
              //   label: 'Contributing',
              //   to: 'contributing/overview',
              // },
              {
                label: 'Community',
                href: 'https://community.digital.ai/',
              },
              {
                label: 'Blog',
                to: 'https://digital.ai/catalyst-blog/',
              },
              {
                label: 'Send Feedback',
                href: 'mailto:documentationfeedback@digital.ai',
              },
              // {
              //   label: 'Directory',
              //   href: 'https://reactnative.directory/',
              // },
              // {
              //   label: 'Stack Overflow',
              //   href: 'https://stackoverflow.com/questions/tagged/react-native',
              // },
            ],
          },
          {
            title: 'Find us',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/digitaldotai',
              },
              {
                label: 'Facebook',
                href: 'https://www.facebook.com/digitalaisw',
              },
              {
                label: 'Linkedin',
                href: 'https://www.linkedin.com/company/digitaldotai/',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/channel/UC6k61LnvJGuBpHqC0uuUQ-g',
              },
              // {
              //   label: 'GitHub',
              //   href: 'https://github.com/facebook/react-native',
              // },
            ],
          },
          {
            title: 'Explore More',
            items: [
              // {
              //   label: 'ReactJS',
              //   href: 'https://reactjs.org/',
              // },
              {
                label: 'Privacy Policy',
                href: 'https://digital.ai/privacy-policy/',
              },
              {
                label: 'Terms and Conditions',
                href: 'https://digital.ai/digital-ai-terms-and-policies/',
              },
            ],
          },
        ],
        logo: {
          alt: 'digital.ai',
          src: 'img/footer_logo.svg',
          href: 'https://digital.ai/',
        },
        copyright,
      },
      algolia: {
        appId: '7R4AH8XVO1',
        apiKey: 'd9168e6b526dcd807c9e45e7a2286c49',
        indexName: 'netlify_8aa0d4ef-dddc-493c-9f6a-751640fc471e_main_all',
        siteId: '8aa0d4ef-dddc-493c-9f6a-751640fc471e',
        branch: 'main',
        contextualSearch: true,
      },
      metadata: [
        {
          property: 'og:image',
          content:
            'https://digital.ai/wp-content/uploads/2022/09/HP-BN-GEN-2022-12-platform-image-2048x367.png',
        },
        {name: 'twitter:card', content: 'summary_large_image'},
        {
          name: 'twitter:image',
          content:
            'https://digital.ai/wp-content/uploads/2022/09/HP-BN-GEN-2022-12-platform-image-2048x367.png',
        },
        {name: 'twitter:site', content: '@digitaldotai'},
      ],
    }),
};
