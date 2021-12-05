import { titleCase } from 'https://deno.land/x/case/mod.ts';

// lib
import { PacksNames } from './constants.ts';
import { getFeatherSnippets } from './snippets/feather.ts';
import { getBoxiconsSnippets } from './snippets/boxicons.ts';
import { getAntdesignSnippets } from './snippets/antdesign.ts';
import { getHeroiconsSnippets } from './snippets/heroicons.ts';
import { getBootstrapSnippets } from './snippets/bootstrap.ts';
import { getFontawesomeSnippets } from './snippets/fontawesome.ts';
import { getFlatcoloriconsSnippets } from './snippets/flatcoloricons.ts';

function createReactComponentName(packName: string, iconName: string) {
  return `${titleCase(packName.replace(/-/g, ' '))} ${titleCase(iconName).split(' ').join('')}`.split(' ').join('');
}

function generateReactIconsCodeSnippet(reactIconName: string, packId: string) {
  return `import { ${reactIconName} } from react-icons/${packId};`;
}

function getReactIconsImport(reactIconName: string, packId: string) {
  return reactIconName ? generateReactIconsCodeSnippet(reactIconName, packId) : '// Import not found';
}

// icon code (html, react, vue) per icon library
export async function getIconPackSnippets(
  svg: string,
  innerSvg: string,
  viewBox: string,
  iconParsedName: string,
  iconName: string,
  packName: PacksNames,
  packId: string,
  reactIconName: string,
  iconType: string,
) {
  const componentName = createReactComponentName(packName, iconParsedName);

  // TODO: Temporary fix until SVGR has Deno support
  const p = Deno.run({
    cmd: ['node', './lib/svgr.js', svg, componentName, viewBox, innerSvg, packName],
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
    reactChakraIcon,
  ] = result;

  const errorString = new TextDecoder().decode(rawError);

  const reactIconsImport = getReactIconsImport(reactIconName, packId);

  if (packName === 'feather') {
    return getFeatherSnippets({
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
    });
  }

  if (packName === 'heroicons') {
    return getHeroiconsSnippets({
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
      componentName: componentName.replace('Heroicons', ''),
    });
  }

  if (packName === 'fontawesome') {
    return getFontawesomeSnippets({
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
    });
  }

  if (packName === 'antdesign') {
    return getAntdesignSnippets({
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
      componentName: componentName.replace('Antdesign', ''),
    });
  }

  if (packName === 'bootstrap') {
    return getBootstrapSnippets({
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
      componentName: componentName.replace('Bootstrap', ''),
    });
  }

  if (packName === 'boxicons') {
    return getBoxiconsSnippets({
      iconName,
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
    });
  }

  if (packName === 'flatcoloricons') {
    return getFlatcoloriconsSnippets({
      iconName,
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
    });
  }

  return '';

  /*
  const iconCodes = {
    feather: featherSnippets,
    heroicons: heroiconsSnippets,
    devicon: featherSnippets,
    boxicons: featherSnippets,
    antdesign: featherSnippets,
    bootstrap: featherSnippets,
    flatcoloricons: featherSnippets,
    fontawesome: featherSnippets,
  };

  return iconCodes[packName]; */
}
