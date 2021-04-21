import * as Fi from 'react-icons/fi';
import * as Bs from 'react-icons/bs';

const featherIcons = Object.keys(Fi);
const bootstrapIcons = Object.keys(Bs);

export const reactIconsPacks = {
  feather: parseReactIconsNames(featherIcons),
  bootstrap: parseReactIconsNames(bootstrapIcons),
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
  return iconPack.reverse().find(({ parsed }) => parsed === iconName);
}

export function generateReactIconsCodeSnippet(iconName: string, packId: string) {
  return `import { ${iconName} } from react-icons/${packId}`;
}
