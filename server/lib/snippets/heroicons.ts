import { pascalCase } from 'https://deno.land/x/case/mod.ts';

export function getHeroiconsSnippets({
  iconName,
  iconParsedName,
  html,
  reactComponentJs,
  reactComponentTs,
  reactNativeComponentJs,
  reactNativeComponentTs,
  reactIconsImport,
  reactChakraIcon,
  styledComponentJs,
  styledComponentTs,
  vueTemplate,
  iconType,
  componentName,
}: any) {
  const heroiconsSnippets = {
    html: {
      options: [{ label: 'Optimized SVG', value: 'optimized-svg' }],
      'optimized-svg': {
        steps: [{ label: 'Usage', language: 'html', content: html }],
        metadata: {
          link: null,
        },
      },
    },
    react: {
      options: [
        {
          label: 'React Component (JS)',
          value: 'react-component-js',
        },
        {
          label: 'React Component (TS)',
          value: 'react-component-ts',
        },
        {
          label: 'React Native Component (JS)',
          value: 'react-native-component-js',
        },
        {
          label: 'React Native Component (TS)',
          value: 'react-native-component-ts',
        },
        {
          label: 'Styled Component (JS)',
          value: 'styled-component-js',
        },
        {
          label: 'Styled Component (TS)',
          value: 'styled-component-ts',
        },
        { label: 'React-icons', value: 'react-icons' },
        { label: 'Heroicons/react', value: '@heroicons/react' },
        { label: 'Chakra UI', value: 'chakra-ui' },
        { label: 'React-native-heroicons', value: 'react-native-heroicons' },
      ],
      'react-component-js': {
        steps: [
          {
            label: 'Install',
            language: 'bash',
            content: { npm: 'npm install react react-dom', yarn: 'yarn add react react-dom' },
          },
          {
            label: 'Usage',
            language: 'jsx',
            content: reactComponentJs,
          },
        ],
        metadata: {
          link: 'https://github.com/facebook/react',
        },
      },
      'react-component-ts': {
        steps: [
          {
            label: 'Install',
            language: 'bash',
            content: {
              npm: 'npm install react react-dom @types/react',
              yarn: 'yarn add react react-dom @types/react',
            },
          },
          {
            label: 'Usage',
            language: 'tsx',
            content: reactComponentTs,
          },
        ],
        metadata: {
          link: 'https://github.com/facebook/react',
        },
      },
      'react-native-component-js': {
        steps: [
          {
            label: 'Install',
            language: 'bash',
            content: { npm: 'npm install react-native-svg', yarn: 'yarn add react-native-svg' },
          },
          { label: 'Usage', language: 'jsx', content: reactNativeComponentJs },
        ],
        metadata: {
          link: null,
        },
      },
      'react-native-component-ts': {
        steps: [
          {
            label: 'Install',
            language: 'bash',
            content: { npm: 'npm install react-native-svg', yarn: 'yarn add react-native-svg' },
          },
          { label: 'Usage', language: 'tsx', content: reactNativeComponentTs },
        ],
        metadata: {
          link: null,
        },
      },
      'react-icons': {
        steps: [
          {
            label: 'Install',
            language: 'bash',
            content: { npm: 'npm install react-icons', yarn: 'yarn add react-icons' },
          },
          {
            label: 'Import',
            language: 'jsx',
            content: reactIconsImport,
          },
          {
            label: 'Usage',
            language: 'jsx',
            content: `<${pascalCase(iconName)} />`,
          },
        ],
        metadata: {
          link: 'https://github.com/react-icons/react-icons',
        },
      },
      '@heroicons/react': {
        steps: [
          {
            label: 'Install',
            language: 'bash',
            content: { npm: 'npm install @heroicons/react', yarn: 'yarn add @heroicons/react' },
          },
          {
            label: 'Import',
            language: 'jsx',
            content: `import { ${componentName}Icon } from '@heroicons/react/${iconType}';`,
          },
          {
            label: 'Usage',
            language: 'jsx',
            content: `<${componentName}Icon />`,
          },
        ],
        metadata: {
          link: 'https://github.com/tailwindlabs/heroicons#react',
        },
      },
      'chakra-ui': {
        steps: [
          {
            label: 'Install',
            language: 'bash',
            content: {
              npm: 'npm install @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4',
              yarn: 'yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4',
            },
          },
          {
            label: 'Import',
            language: 'jsx',
            content: `import { Icon } from "@chakra-ui/react";`,
          },
          {
            label: 'Usage',
            language: 'jsx',
            content: reactChakraIcon,
          },
        ],
        metadata: {
          link: 'https://chakra-ui.com',
        },
      },
      'styled-component-js': {
        steps: [
          {
            label: 'Install',
            language: 'bash',
            content: {
              npm: 'npm install styled-components',
              yarn: 'yarn add styled-components',
            },
          },
          {
            label: 'Import',
            language: 'jsx',
            content: `import styled, { css } from 'styled-components';`,
          },
          {
            label: 'Usage',
            language: 'jsx',
            content: styledComponentJs,
          },
        ],
        metadata: {
          link: 'https://styled-components.com',
        },
      },
      'styled-component-ts': {
        steps: [
          {
            label: 'Install',
            language: 'bash',
            content: {
              npm: 'npm install styled-components @types/styled-components',
              yarn: 'yarn add styled-components @types/styled-components',
            },
          },
          {
            label: 'Import',
            language: 'jsx',
            content: `import styled, { css } from 'styled-components';`,
          },
          {
            label: 'Usage',
            language: 'tsx',
            content: styledComponentTs,
          },
        ],
        metadata: {
          link: 'https://styled-components.com',
        },
      },
      'react-native-heroicons': {
        steps: [
          {
            label: 'Install',
            language: 'bash',
            content: {
              npm: 'npm install react-native-heroicons react-native-svg',
              yarn: 'yarn add react-native-heroicons react-native-svg',
            },
          },
          {
            label: 'Import',
            language: 'jsx',
            content: `import { ${componentName}Icon } from "react-native-heroicons/${iconType}";`,
          },
          {
            label: 'Usage',
            language: 'jsx',
            content: `<${componentName}Icon />`,
          },
        ],
        metadata: {
          link: 'https://github.com/ecklf/react-native-heroicons',
        },
      },
    },
    vue: {
      options: [
        { label: 'Vue Template', value: 'vue-template' },
        { label: 'Heroicons/vue', value: '@heroicons/vue' },
      ],
      'vue-template': {
        steps: [
          {
            label: 'Usage',
            language: 'html',
            content: vueTemplate,
          },
        ],
        metadata: {
          link: null,
        },
      },
      '@heroicons/vue': {
        steps: [
          {
            label: 'Install',
            language: 'bash',
            content: { npm: 'npm install @heroicons/vue', yarn: 'yarn add @heroicons/vue' },
          },
          {
            label: 'Import',
            language: 'jsx',
            content: `import { ${componentName}Icon } from '@heroicons/react/${iconType}';`,
          },
          {
            label: 'Usage',
            language: 'jsx',
            content: `<${componentName}Icon />`,
          },
        ],
        metadata: {
          link: 'https://github.com/tailwindlabs/heroicons#vue',
        },
      },
    },
  };

  return heroiconsSnippets;
}
