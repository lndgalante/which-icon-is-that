import { pascalCase } from 'https://deno.land/x/case/mod.ts';

export function getFeatherSnippets({
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
}: any) {
  const featherSnippets = {
    html: {
      options: [
        { label: 'Optimized SVG', value: 'optimized-svg' },
        { label: 'Font (CDN)', value: 'font' },
        { label: 'Script', value: 'script' },
        { label: 'Icongram', value: 'icongram' },
      ],
      'optimized-svg': {
        steps: [{ label: 'Usage', language: 'html', content: html }],
        metadata: {
          link: null,
        },
      },
      font: {
        steps: [
          {
            label: 'Import',
            language: 'html',
            content: '<link rel="stylesheet" href="//at.alicdn.com/t/font_o5hd5vvqpoqiwwmi.css">',
          },
          { label: 'Usage', language: 'html', content: `<i class="feather icon-${iconName}"></i>` },
        ],
        metadata: {
          link: 'https://github.com/AT-UI/feather-font',
        },
      },
      script: {
        steps: [
          { label: 'Import', language: 'html', content: '<script src="https://unpkg.com/feather-icons"></script>' },
          { label: 'Setup', language: 'html', content: '<script>feather.replace();</script>' },
          { label: 'Usage', language: 'html', content: `<i data-feather="${iconName}"></i>` },
        ],
        metadata: {
          label: 'Script',
          value: 'script',
          link: 'https://github.com/feathericons/feather',
        },
      },
      icongram: {
        steps: [
          {
            label: 'Usage',
            language: 'html',
            content: `<img src="https://icongr.am/feather/${iconName}.svg?size=24&color=currentColor" placeholder="${iconParsedName}" />`,
          },
        ],
        metadata: {
          label: 'Icongram',
          value: 'icongram',
          link: 'https://icongr.am/feather',
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
        { label: 'React-feather', value: 'react-feather' },
        { label: 'Chakra UI', value: 'chakra-ui' },
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
      'react-feather': {
        steps: [
          {
            label: 'Install',
            language: 'bash',
            content: { npm: 'npm install react-feather', yarn: 'yarn add react-feather' },
          },
          {
            label: 'Import',
            language: 'jsx',
            content: `import { ${pascalCase(iconName)} } from 'react-feather';`,
          },
          {
            label: 'Usage',
            language: 'jsx',
            content: `<${pascalCase(iconName)} />`,
          },
        ],
        metadata: {
          link: 'https://github.com/feathericons/react-feather',
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
    },
    vue: {
      options: [
        { label: 'Vue Template', value: 'vue-template' },
        { label: 'Vue-feather', value: 'vue-feather' },
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
      'vue-feather': {
        steps: [
          {
            label: 'Install',
            language: 'bash',
            content: { npm: 'npm install vue-feather', yarn: 'yarn add vue-feather' },
          },
          { label: 'Import', language: 'jsx', content: `import VueFeather from 'vue-feather;` },
          { label: 'Setup', language: 'javascript', content: 'Vue.use(VueFeather);' },
          { label: 'Usage', language: 'html', content: `<vue-feather type="${iconName}"></vue-feather>` },
        ],
        metadata: {
          link: 'https://github.com/fengyuanchen/vue-feather',
        },
      },
    },
  };

  return featherSnippets;
}
