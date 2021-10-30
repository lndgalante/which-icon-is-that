import { pascalCase, titleCase } from 'https://deno.land/x/case/mod.ts';

// lib
import { PacksNames } from './constants.ts';

function createReactComponentName(packName: string, iconName: string) {
  return titleCase(`${packName.replace(/-/g, ' ')} ${iconName.replace(/-/g, ' ')}`)
    .split(' ')
    .join('');
}

function generateReactIconsCodeSnippet(reactIconName: string, packId: string) {
  return `import { ${reactIconName} } from react-icons/${packId};`;
}

function getReactIconsImport(reactIconName: string, packId: string) {
  return reactIconName ? generateReactIconsCodeSnippet(reactIconName, packId) : '// Import not found';
}

function createReactChakraIcon(viewBox: string, innerSvg: string) {
  return `<Icon viewBox="${viewBox}">${innerSvg}</Icon>`;
}

// icon code (html, react, vue) per icon library
export async function generateIconSnippets(
  svg: string,
  innerSvg: string,
  viewBox: string,
  iconParsedName: string,
  iconName: string,
  packName: PacksNames,
  packId: string,
  reactIconName: string,
) {
  const componentName = createReactComponentName(packName, iconName);

  // TODO: Temporary fix until SVGR has Deno support
  const p = Deno.run({
    cmd: ['node', './lib/svgr.js', svg, componentName],
    stdout: 'piped',
    stderr: 'piped',
  });

  const rawOutput = await p.output();
  const rawError = await p.stderrOutput();

  const outputString = new TextDecoder().decode(rawOutput);

  const result = JSON.parse(outputString);

  const [
    html,
    vueTemplate,
    reactComponentJs,
    reactComponentTs,
    reactNativeComponentJs,
    reactNativeComponentTs,
    styledComponentJs,
    styledComponentTs,
  ] = result;

  const errorString = new TextDecoder().decode(rawError);

  const reactIconsImport = getReactIconsImport(reactIconName, packId);

  // TODO: Format through svgr when is avaiable for deno
  const reactChakraIcon = createReactChakraIcon(viewBox, innerSvg);

  const FEATHER_CODES = {
    html: {
      optimizedSvg: {
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
          link: `https://icongr.am/feather`,
        },
      },
    },
    react: {
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
              npm: 'npm install --save styled-components',
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
              npm: 'npm install --save styled-components @types/styled-components',
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

  const iconCodes = {
    feather: FEATHER_CODES,
    heroicons: FEATHER_CODES,
    devicon: FEATHER_CODES,
    boxicons: FEATHER_CODES,
    antdesign: FEATHER_CODES,
    bootstrap: FEATHER_CODES,
    flatcoloricons: FEATHER_CODES,
    fontawesome: FEATHER_CODES,
  };

  return iconCodes[packName];
}
