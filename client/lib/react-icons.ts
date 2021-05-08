import * as Hi from 'react-icons/hi';
import * as Fi from 'react-icons/fi';
import * as Bs from 'react-icons/bs';
import * as Ai from 'react-icons/ai';
import * as Bi from 'react-icons/bi';
import * as Di from 'react-icons/di';

const heroIcons = Object.keys(Hi);
const featherIcons = Object.keys(Fi);
const bootstrapIcons = Object.keys(Bs);
const antdesignIcons = Object.keys(Ai);
const boxIcons = Object.keys(Bi);
const devIcons = Object.keys(Di);

export const reactIconsPacks = {
  heroicons: parseReactIconsNames(heroIcons),
  feather: parseReactIconsNames(featherIcons),
  bootstrap: parseReactIconsNames(bootstrapIcons),
  antdesign: parseReactIconsNames(antdesignIcons),
  boxicons: parseReactIconsNames(boxIcons),
  devicon: parseReactIconsNames(devIcons),
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

export function getReactIcon(iconName: string, iconPackName: string) {
  const iconPack = reactIconsPacks[iconPackName];

  const firstParseIconName = iconName.startsWith('bx') ? iconName.slice(3) : iconName;
  const parsedIconName = firstParseIconName.startsWith('-') ? firstParseIconName.slice(1) : iconName;

  return iconPack.reverse().find(({ parsed }) => parsed === parsedIconName);
}

export function generateReactIconsCodeSnippet(iconName: string, packId: string) {
  return `import { ${iconName} } from react-icons/${packId}`;
}

export function getReactIconsImport(reactIconName, packId) {
  return reactIconName ? generateReactIconsCodeSnippet(reactIconName, packId) : '// Import not found';
}
