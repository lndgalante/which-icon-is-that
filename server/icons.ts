import getFiles from 'https://deno.land/x/getfiles/mod.ts';
import { Client } from 'https://deno.land/x/postgres/mod.ts';
import { delay } from 'https://deno.land/x/delay@v0.2.0/mod.ts';
import { sizeof } from 'https://deno.land/x/sizeof@v1.0.3/mod.ts';
import { unZipFromFile } from 'https://deno.land/x/zip@v1.1.1/mod.ts';
import upperFirstCase from 'https://deno.land/x/case/upperFirstCase.ts';
import { download, Destination } from 'https://deno.land/x/download/mod.ts';
import { prettyBytes } from 'https://raw.githubusercontent.com/brunnerlivio/deno-pretty-bytes/master/mod.ts';

// helpers
import { createHash } from './hash.ts';
import { getInnerHTMLFromSvgText } from './dom.ts';

// types
type PacksNames = keyof typeof ICONS_WEBSITE_LINKS;

type Type = 'default' | 'outline' | 'solid';

export type Svg = {
  hash: string;
  svg: string;
  bytes: string;
  pack_id: string;
  icon_name: string;
  icon_file_name: string;
  type: Type;
  pack_name: PacksNames;
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
  { packId: 'hi', packName: 'heroicons', owner: 'tailwindlabs', repo: 'heroicons' },
];

export function getIconSource(iconPack: PacksNames, iconFileName: string) {
  const links = {
    bootstrap: (iconFileName: string) => `${GITHUB}/twbs/icons/blob/main/icons/${iconFileName}`,
    feather: (iconFileName: string) => `${GITHUB}/feathericons/feather/blob/master/icons/${iconFileName}`,
    heroicons: (iconFileName: string) => `${GITHUB}/tailwindlabs/heroicons/blob/master/src/outline/${iconFileName}`,
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

export async function saveIconsInDB(client: Client) {
  const transaction = client.createTransaction('transaction_1');
  await transaction.begin();

  await transaction.queryArray`DROP TABLE icons`;
  await transaction.queryArray`CREATE TABLE icons (hash TEXT, svg TEXT, type TEXT, bytes TEXT, pack_id TEXT, pack_name TEXT, icon_name TEXT, icon_file_name TEXT)`;

  for (const { packId, packName, owner, repo } of ICONS_LIST) {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases`);
    const [lastRelease] = await response.json();
    const { zipball_url } = lastRelease;

    // download zip
    const downloadDirectory = './downloads';
    const unzippedDirectory = `${downloadDirectory}/unzipped`;
    const unzippedDirectoryPack = `${unzippedDirectory}/${packName}`;

    const fileName = `${packName}.zip`;
    const fullPath = `${downloadDirectory}/${fileName}`;

    const destination: Destination = { dir: downloadDirectory, file: fileName };
    await download(zipball_url, destination);

    // unZipFromFile
    unZipFromFile(fullPath, unzippedDirectory, { includeFileName: true });

    // wait for unzipping
    await delay(2000);

    const unzippedNames = await getFiles(unzippedDirectoryPack);
    const svgFiles = unzippedNames
      .filter(({ name, ext }) => !(name === 'bootstrap-icons.svg' || name.endsWith('-preview.svg')) && ext === 'svg')
      .map(({ name, path }) => {
        const [type] = path.match(/outline|solid/g) || ['default'];
        return { name, path, type: upperFirstCase(type) };
      });

    for (const { name, path, type } of svgFiles) {
      const svg = await Deno.readTextFile(path);

      const iconName = name.replace('.svg', '');
      const bytes = prettyBytes(sizeof(svg).bytesize);

      const svgInnerHtml = getInnerHTMLFromSvgText(svg);
      const hash = createHash(svgInnerHtml);

      await transaction.queryArray`INSERT INTO ICONS(hash,svg,type,bytes,pack_id,pack_name,icon_name,icon_file_name) VALUES (${hash},${svg},${type},${bytes},${packId},${packName},${iconName},${name})`;
    }
  }

  await transaction.commit();
}
