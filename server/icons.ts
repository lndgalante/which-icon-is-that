import getFiles from 'https://deno.land/x/getfiles/mod.ts';
import { Client } from 'https://deno.land/x/postgres/mod.ts';
import { prettyBytes } from 'https://raw.githubusercontent.com/brunnerlivio/deno-pretty-bytes/master/mod.ts';

// helpers
import { createHash } from './hash.ts';
import { getInnerHTMLFromSvgText } from './dom.ts';
import {
  PacksNames,
  ICONS_LIST,
  ICON_PAGE_LINK,
  ICONS_FIGMA_LINKS,
  ICONS_SOURCE_LINKS,
  ICONS_WEBSITE_LINKS,
} from './constants.ts';

export function getIconSource(iconPack: PacksNames, iconFileName: string, iconType: string) {
  const getIconSourceLinkFn = ICONS_SOURCE_LINKS[iconPack];
  return getIconSourceLinkFn(iconFileName, iconType);
}

export function getIconLink(iconPack: PacksNames, iconName: string) {
  const getIconPackLinkFn = ICON_PAGE_LINK[iconPack];
  return getIconPackLinkFn(iconName);
}

export function getIconPackWebsite(svgPackName: PacksNames) {
  const iconPackWebsite = ICONS_WEBSITE_LINKS[svgPackName];
  return iconPackWebsite;
}

export function getIconPackFigmaLink(svgPackName: string) {
  const iconPackFigmaLink = ICONS_FIGMA_LINKS[svgPackName as PacksNames];
  return iconPackFigmaLink;
}

export async function saveIconsInDB(client: Client) {
  const transaction = client.createTransaction('new_transaction');
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
      const { size } = await Deno.stat(path);
      let svg = await Deno.readTextFile(path);

      if (svg.includes('<?xml')) {
        const svgArray = svg.split(/\n/g);
        svgArray.shift();
        svg = svgArray.join('');
      }

      const iconName = name.replace('.svg', '');
      const bytes = prettyBytes(size);
      const svgInnerHtml = getInnerHTMLFromSvgText(svg);
      const hash = createHash(svgInnerHtml);
      await transaction.queryArray`INSERT INTO icons(hash,svg,icon_type,bytes,pack_id,pack_name,icon_name,icon_file_name) VALUES (${hash},${svg},${iconType},${bytes},${packId},${packName},${iconName},${name})`;

      const encodedPath = encodeURIComponent(`${packName}/${iconType}/${iconName}`);
      await transaction.queryArray`INSERT INTO paths(path,hash) VALUES (${encodedPath},${hash})`;
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
