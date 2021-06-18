import { createRequire } from 'https://deno.land/std/node/module.ts';
import { pascalCase, titleCase } from 'https://deno.land/x/case/mod.ts';

// lib
import { PacksNames } from '../lib/constants.ts';

// commonjs require
const require = createRequire(import.meta.url);

const Hi = require('react-icons/hi');
const Fi = require('react-icons/fi');
const Bs = require('react-icons/bs');
const Ai = require('react-icons/ai');
const Bi = require('react-icons/bi');
const Di = require('react-icons/di');
const Fc = require('react-icons/fc');

function createReactComponentName(packName: string, iconName: string) {
  return titleCase(`${packName.replace(/-/g, ' ')} ${iconName.replace(/-/g, ' ')}`)
    .split(' ')
    .join('');
}

// react-icons
const heroIcons = Object.keys(Hi);
const featherIcons = Object.keys(Fi);
const bootstrapIcons = Object.keys(Bs);
const antdesignIcons = Object.keys(Ai);
const boxIcons = Object.keys(Bi);
const devIcons = Object.keys(Di);
const flatColorIcons = Object.keys(Fc);

export const reactIconsPacks = {
  heroicons: parseReactIconsNames(heroIcons),
  feather: parseReactIconsNames(featherIcons),
  bootstrap: parseReactIconsNames(bootstrapIcons),
  antdesign: parseReactIconsNames(antdesignIcons),
  boxicons: parseReactIconsNames(boxIcons),
  devicon: parseReactIconsNames(devIcons),
  flatcoloricons: parseReactIconsNames(flatColorIcons),
};

function parseReactIconsNames(icons: string[]) {
  return icons.map((icon) => {
    const parsed = icon
      .replace(/^.{2}/i, '')
      .replace(/[A-Z]/g, (match) => `-${match}`)
      .replace('-', '')
      .toLowerCase();

    return { original: icon, parsed };
  });
}

function getReactIcon(iconName: string, iconPackName: PacksNames) {
  const iconPack = reactIconsPacks[iconPackName];

  const firstParseIconName = iconName.startsWith('bx') ? iconName.slice(3) : iconName;
  const parsedIconName = firstParseIconName.startsWith('-') ? firstParseIconName.slice(1) : iconName;

  return iconPack.reverse().find(({ parsed }) => parsed === parsedIconName)!;
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

  const reactIconName = getReactIcon(iconName, packName);
  const reactIconsImport = getReactIconsImport(reactIconName.original, packId);

  // TODO: Format through svgr when is avaiable for deno
  const reactChakraIcon = createReactChakraIcon(viewBox, innerSvg);

  const iconCodes = {
    feather: {
      html: {
        optimizedSvg: {
          install: null,
          import: null,
          setup: null,
          usage: html,
          link: null,
        },
        font: {
          install: null,
          import: '<link rel="stylesheet" href="//at.alicdn.com/t/font_o5hd5vvqpoqiwwmi.css">',
          setup: null,
          usage: `<i class="feather icon-${iconName}"></i>`,
          link: 'https://github.com/AT-UI/feather-font',
        },
        script: {
          install: null,
          import: '<script src="https://unpkg.com/feather-icons"></script>',
          setup: '<script>feather.replace();</script>',
          usage: `<i data-feather="${iconName}"></i>`,
          link: 'https://github.com/AT-UI/feather-font',
        },
        icongram: {
          install: null,
          import: null,
          setup: null,
          usage: `<img src="https://icongr.am/feather/${iconName}.svg?size=24&color=currentColor" placeholder="${iconParsedName} />"`,
          link: `https://icongr.am/feather`,
        },
      },
      react: {
        'react-component-js': {
          install: { npm: 'npm install react react-dom', yarn: 'yarn add react react-dom' },
          import: null,
          setup: null,
          usage: reactComponentJs,
          link: 'https://github.com/facebook/react',
        },
        'react-component-ts': {
          install: { npm: 'npm install react react-dom @types/react', yarn: 'yarn add react react-dom @types/react' },
          import: null,
          setup: null,
          usage: reactComponentTs,
          link: 'https://github.com/facebook/react',
        },
        'react-icons': {
          install: { npm: 'npm install react-icons', yarn: 'yarn add react-icons' },
          import: reactIconsImport,
          setup: null,
          usage: `<${pascalCase(iconName)} />`,
          link: 'https://github.com/react-icons/react-icons',
        },
        'react-feather': {
          install: { npm: 'npm install react-feather', yarn: 'yarn add react-feather' },
          import: `import { ${pascalCase(iconName)} } from 'react-feather';`,
          setup: null,
          usage: `<${pascalCase(iconName)} />`,
          link: 'https://github.com/feathericons/react-feather',
        },
        'chakra-ui': {
          install: {
            npm: 'npm install @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4',
            yarn: 'yarn add @chakra-ui/react @emotion/react@^11 @emotion/styled@^11 framer-motion@^4',
          },
          import: `import { Icon } from "@chakra-ui/react";`,
          setup: null,
          usage: reactChakraIcon,
          link: 'https://chakra-ui.com',
        },
        'styled-component-js': {
          install: {
            npm: 'npm install --save styled-components',
            yarn: 'yarn add styled-components',
          },
          import: `import styled, { css } from 'styled-components';`,
          setup: null,
          usage: styledComponentJs,
          link: 'https://styled-components.com',
        },
        'styled-component-ts': {
          install: {
            npm: 'npm install --save styled-components @types/styled-components',
            yarn: 'yarn add styled-components @types/styled-components',
          },
          import: `import styled, { css } from 'styled-components';`,
          setup: null,
          usage: styledComponentTs,
          link: 'https://styled-components.com',
        },
      },
      vue: {
        'vue-template': {
          install: null,
          import: null,
          setup: null,
          usage: vueTemplate,
          link: null,
        },
        'vue-feather': {
          install: { npm: 'npm install vue-feather', yarn: 'yarn add vue-feather' },
          import: `import VueFeather from 'vue-feather';`,
          setup: 'Vue.use(VueFeather);',
          usage: `<vue-feather type="${iconName}"></vue-feather>`,
          link: 'https://github.com/fengyuanchen/vue-feather',
        },
      },
      'react-native': {
        'react-native-component-js': {
          install: { npm: 'npm install react-native-svg', yarn: 'yarn add react-native-svg' },
          import: null,
          setup: null,
          usage: reactNativeComponentJs,
          link: null,
        },
        'react-native-component-ts': {
          install: { npm: 'npm install react-native-svg', yarn: 'yarn add react-native-svg' },
          import: null,
          setup: null,
          usage: reactNativeComponentTs,
          link: null,
        },
      },
    },
    devicon: {},
    boxicons: {},
    heroicons: {},
    antdesign: {},
    bootstrap: {},
    flatcoloricons: {},
  };

  return iconCodes[packName];
}
