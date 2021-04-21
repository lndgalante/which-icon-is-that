import { Redis } from 'https://deno.land/x/redis/mod.ts';
import { readZip } from 'https://deno.land/x/jszip/mod.ts';
import { sizeof } from 'https://deno.land/x/sizeof@v1.0.3/mod.ts';
import { download, Destination } from 'https://deno.land/x/download/mod.ts';
import { prettyBytes } from 'https://raw.githubusercontent.com/brunnerlivio/deno-pretty-bytes/master/mod.ts';

// helpers
import { createHash } from './hash.ts';
import { getInnerHTMLFromSvgText } from './dom.ts';

// types
type PacksNames = keyof typeof ICONS_WEBSITE_LINKS;

export type Svg = {
  svg: string;
  bytes: string;
  packName: string;
  packId: string;
  iconName: string;
  iconFileName: string;
};

// constants
const GITHUB = 'https://github.com';

const ICONS_WEBSITE_LINKS = {
  heroicons: 'https://heroicons.com',
  feather: 'https://feathericons.com',
  bootstrap: 'https://icons.getbootstrap.com',
};

const ICONS_FIGMA_LINKS = {
  heroicons: 'https://www.figma.com/community/file/958423903283802665',
  bootstrap: 'https://www.figma.com/file/YjjMzXhECL1MIb6Qlm7VJO/Bootstrap-Icons-v1.4.1',
  feather: 'https://www.figma.com/file/dyJRSFTIajik4cdkcXN8yA3K/Feather-Component-Library?node-id=0%3A1',
};

const ICONS_LIST = [
  { packId: 'bs', packName: 'bootstrap', owner: 'twbs', repo: 'icons' },
  { packId: 'fi', packName: 'feather', owner: 'feathericons', repo: 'feather' },
  // { packId: 'hi', packName: 'heroicons', owner: 'tailwindlabs', repo: 'heroicons' },
];

export function getIconSource(iconPack: PacksNames, iconFileName: string) {
  const links = {
    bootstrap: (iconFileName: string) => `${GITHUB}/twbs/icons/blob/main/icons/${iconFileName}`,
    heroicons: (iconFileName: string) => `${GITHUB}/twbs/icons/blob/main/icons/${iconFileName}`,
    feather: (iconFileName: string) => `${GITHUB}/tailwindlabs/heroicons/blob/master/src/outline/${iconFileName}`,
  };

  const getIconSourceLinkFn = links[iconPack];
  const iconSourceLink = getIconSourceLinkFn(iconFileName);

  return iconSourceLink;
}

export function getIconLink(iconPack: PacksNames, iconName: string) {
  const links = {
    heroicons: () => ICONS_WEBSITE_LINKS.heroicons,
    feather: (iconName: string) => `${ICONS_WEBSITE_LINKS.feather}/?query=${iconName}`,
    bootstrap: (iconName: string) => `${ICONS_WEBSITE_LINKS.bootstrap}/icons/${iconName}`,
  };
  const getIconPackLinkFn = links[iconPack];
  const iconLink = getIconPackLinkFn(iconName);

  return iconLink;
}

export function getIconPackWebsite(svgPackName: string) {
  const iconPackWebsite = ICONS_WEBSITE_LINKS[svgPackName as PacksNames];
  return iconPackWebsite;
}

export function getIconPackFigmaLink(svgPackName: string) {
  const iconPackFigmaLink = ICONS_FIGMA_LINKS[svgPackName as PacksNames];
  return iconPackFigmaLink;
}

export async function saveIconsIntoRedis(redis: Redis) {
  for (const { packId, packName, owner, repo } of ICONS_LIST) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`);
    const [lastRelease] = await response.json();
    const { zipball_url } = lastRelease;

    // download zip
    const directory = './downloads';
    const fileName = `${packName}.zip`;
    const fullPath = `${directory}/${fileName}`;
    const destination: Destination = { dir: directory, file: fileName };
    await download(zipball_url, destination);

    // read zip
    if (fileName.endsWith('.zip')) {
      const zip = await readZip(fullPath);

      for await (const file of zip) {
        const { name } = file;

        if (!name.endsWith('bootstrap-icons.svg') && name.endsWith('svg')) {
          const svg = await zip.file(name).async('string');
          const [iconFileName] = name.split('/').reverse();
          const iconName = iconFileName.replace('.svg', '');
          const bytes = prettyBytes(sizeof(svg).bytesize);

          const svgInnerHtml = getInnerHTMLFromSvgText(svg);
          const hash = createHash(svgInnerHtml);
          const metadata: Svg = { svg, bytes, packId, packName, iconName, iconFileName };

          await redis.set(hash, JSON.stringify(metadata));
        }
      }
    }
  }
}
