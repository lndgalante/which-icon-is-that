import getFiles from 'https://deno.land/x/getfiles/mod.ts';
import { Client } from 'https://deno.land/x/postgres/mod.ts';
import { sizeof } from 'https://deno.land/x/sizeof@v1.0.3/mod.ts';
import { prettyBytes } from 'https://raw.githubusercontent.com/brunnerlivio/deno-pretty-bytes/master/mod.ts';

// helpers
import { createHash } from './hash.ts';
import { getInnerHTMLFromSvgText } from './dom.ts';

// types
type PacksNames = keyof typeof ICONS_WEBSITE_LINKS;

type IconType = 'outline' | 'solid' | 'fill' | 'twotone' | 'logos' | 'regular';

export type Svg = {
  hash: string;
  svg: string;
  bytes: string;
  pack_id: string;
  icon_type: IconType;
  icon_name: string;
  icon_file_name: string;
  pack_name: PacksNames;
};

// constants
const GITHUB = 'https://github.com';

const ICONS_WEBSITE_LINKS = {
  heroicons: 'https://heroicons.com',
  feather: 'https://feathericons.com',
  bootstrap: 'https://icons.getbootstrap.com',
  antdesign: 'https://ant.design',
  boxicons: 'https://boxicons.com',
};

const ICONS_FIGMA_LINKS = {
  heroicons: 'https://www.figma.com/community/file/958423903283802665',
  bootstrap: 'https://www.figma.com/file/YjjMzXhECL1MIb6Qlm7VJO/Bootstrap-Icons-v1.4.1',
  feather: 'https://www.figma.com/file/dyJRSFTIajik4cdkcXN8yA3K/Feather-Component-Library?node-id=0%3A1',
  antdesign: 'https://www.figma.com/community/file/831698976089873405',
  boxicons: 'https://www.figma.com/community/file/907154826824434501',
};

const ICONS_LIST = [
  { packId: 'bs', packName: 'bootstrap', owner: 'twbs', repo: 'icons', type: 'releases' },
  { packId: 'fi', packName: 'feather', owner: 'feathericons', repo: 'feather', type: 'releases' },
  { packId: 'hi', packName: 'heroicons', owner: 'tailwindlabs', repo: 'heroicons', type: 'releases' },
  { packId: 'ai', packName: 'antdesign', owner: 'ant-design', repo: 'ant-design-icons', type: 'tags' },
  { packId: 'bi', packName: 'boxicons', owner: 'atisawd', repo: 'boxicons', type: 'releases' },
];

const ICONS_SOURCE_LINKS = {
  bootstrap: (iconFileName: string) => {
    return `${GITHUB}/twbs/icons/blob/main/icons/${iconFileName}`;
  },
  feather: (iconFileName: string) => {
    return `${GITHUB}/feathericons/feather/blob/master/icons/${iconFileName}`;
  },
  heroicons: (iconFileName: string) => {
    return `${GITHUB}/tailwindlabs/heroicons/blob/master/src/outline/${iconFileName}`;
  },
  antdesign: (iconFileName: string, iconType: string) => {
    return `${GITHUB}/ant-design/ant-design-icons/blob/master/packages/icons-svg/svg/${iconType}/${iconFileName}`;
  },
  boxicons: (iconFileName: string, iconType: string) => {
    return `${GITHUB}/atiswad/boxicons/blob/master/svg/${iconType}/${iconFileName}`;
  },
};

const ICON_PAGE_LINK = {
  boxicons: () => ICONS_WEBSITE_LINKS.boxicons,
  heroicons: () => ICONS_WEBSITE_LINKS.heroicons,
  antdesign: () => `${ICONS_WEBSITE_LINKS.antdesign}/components/icon`,
  feather: (iconName: string) => `${ICONS_WEBSITE_LINKS.feather}/?query=${iconName}`,
  bootstrap: (iconName: string) => `${ICONS_WEBSITE_LINKS.bootstrap}/icons/${iconName}`,
};

export function getIconSource(iconPack: PacksNames, iconFileName: string, iconType: string) {
  const getIconSourceLinkFn = ICONS_SOURCE_LINKS[iconPack];
  return getIconSourceLinkFn(iconFileName, iconType);
}

export function getIconLink(iconPack: PacksNames, iconName: string) {
  const getIconPackLinkFn = ICON_PAGE_LINK[iconPack];
  return getIconPackLinkFn(iconName);
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
  await transaction.queryArray`DROP TABLE paths`;

  await transaction.queryArray`CREATE TABLE paths (path TEXT, hash TEXT)`;
  await transaction.queryArray`CREATE TABLE icons (hash TEXT, svg TEXT, icon_type TEXT, bytes TEXT, pack_id TEXT, pack_name TEXT, icon_name TEXT, icon_file_name TEXT)`;

  await transaction.queryArray`CREATE INDEX hash_index ON icons(hash)`;
  await transaction.queryArray`CREATE INDEX path_index ON paths(path)`;

  for (const { packId, packName } of ICONS_LIST) {
    const downloadDirectory = './downloads';
    const unzippedDirectory = `${downloadDirectory}/unzipped`;
    const unzippedDirectoryPack = `${unzippedDirectory}/${packName}`;

    const unzippedNames = await getFiles(unzippedDirectoryPack);
    const svgFiles = unzippedNames
      .filter(({ name, ext }) => !(name === 'bootstrap-icons.svg') && ext === 'svg')
      .map(({ name, path }) => {
        const [iconType] = path.match(/outline|solid|fill|twotone|logos|regular/gi) || ['regular'];
        return { name, path, iconType };
      });

    for (const { name, path, iconType } of svgFiles) {
      let svg = await Deno.readTextFile(path);

      if (svg.includes('<?xml')) {
        const svgArray = svg.split(/\n/g);
        svgArray.shift();
        svg = svgArray.join('');
      }

      const iconName = name.replace('.svg', '');
      const bytes = prettyBytes(sizeof(svg).bytesize);

      const svgInnerHtml = getInnerHTMLFromSvgText(svg);
      const hash = createHash(svgInnerHtml);

      await transaction.queryArray`INSERT INTO paths(path,hash) VALUES (${packName};${iconType};${iconName},${hash})`;
      await transaction.queryArray`INSERT INTO icons(hash,svg,icon_type,bytes,pack_id,pack_name,icon_name,icon_file_name) VALUES (${hash},${svg},${iconType},${bytes},${packId},${packName},${iconName},${name})`;
    }
  }

  await transaction.commit();
}

/*
import { delay } from 'https://deno.land/x/delay@v0.2.0/mod.ts';
import { unZipFromFile } from 'https://deno.land/x/zip@v1.1.1/mod.ts';
import upperFirstCase from 'https://deno.land/x/case/upperFirstCase.ts';
import { download, Destination } from 'https://deno.land/x/download/mod.ts';

// .filter(({ name, ext }) => !(name === 'bootstrap-icons.svg' || name.endsWith('-preview.svg')) && ext === 'svg')

const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/${type}`);
const [lastRelease] = await response.json();
const { zipball_url } = lastRelease;'

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
await delay(15000);
*/
