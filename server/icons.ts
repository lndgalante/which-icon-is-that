import { Md5 } from 'https://deno.land/std/hash/md5.ts';
import { readZip } from 'https://deno.land/x/jszip/mod.ts';
import { sizeof } from 'https://deno.land/x/sizeof@v1.0.3/mod.ts';
import { download, Destination } from 'https://deno.land/x/download/mod.ts';
import { prettyBytes } from 'https://raw.githubusercontent.com/brunnerlivio/deno-pretty-bytes/master/mod.ts';

// types
type PacksNames = keyof typeof ICONS_LINKS;

type Svg = {
  svg: string;
  bytes: string;
  pack: string;
  name: string;
  fileName: string;
};

type SvgMap = {
  [key: string]: string;
};

// helpers
const createHash = (value: string): string => new Md5().update(value.replace(/\s/g, '')).toString();

// constants
const ICONS_LINKS = {
  feather: 'https://feathericons.com',
  bootstrap: 'https://icons.getbootstrap.com',
};

const ICONS_LIST = [
  { packName: 'bootstrap', owner: 'twbs', repo: 'icons' },
  { packName: 'feather', owner: 'feathericons', repo: 'feather' },
];

export function getIconLink(iconPack: PacksNames, iconName: string) {
  const links = {
    feather: (iconName: string) => `${ICONS_LINKS.feather}/?query=${iconName}`,
    bootstrap: (iconName: string) => `${ICONS_LINKS.bootstrap}/icons/${iconName}`,
  };
  const getIconPackLinkFn = links[iconPack];
  const iconLink = getIconPackLinkFn(iconName);

  return iconLink;
}

export function getIconPackWebsite(svgPackName: string) {
  const iconPackWebsite = ICONS_LINKS[svgPackName as PacksNames];
  return iconPackWebsite;
}

export async function createSvgsMap() {
  const result: SvgMap = {};

  for (const { packName, owner, repo } of ICONS_LIST) {
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
          const parsedName = iconFileName.replace('.svg', '');
          const bytes = prettyBytes(sizeof(svg).bytesize);

          const key = createHash(svg);
          const value: Svg = { svg, bytes, pack: packName, name: parsedName, fileName: iconFileName };

          result[key] = JSON.stringify(value);
        }
      }
    }
  }

  return result;
}
