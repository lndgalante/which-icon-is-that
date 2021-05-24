import getFiles from 'https://deno.land/x/getfiles/mod.ts';
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

// database
import client from '../db/database.ts';

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

let i = 0;

export async function saveIconsInDB() {
  try {
    const transaction = client.createTransaction('tx-create-db');
    await transaction.begin();

    await transaction.queryArray`DROP TABLE icons`;
    await transaction.queryArray`DROP TABLE paths`;

    await transaction.queryArray`CREATE TABLE paths (path TEXT, hash TEXT)`;
    await transaction.queryArray(
      `CREATE TABLE icons (hash TEXT, svg TEXT, icon_type TEXT, bytes TEXT, pack_id TEXT, pack_name TEXT, icon_name TEXT, icon_file_name TEXT, found SERIAL)`,
    );

    await transaction.queryArray`CREATE INDEX hash_index ON icons(hash)`;
    await transaction.queryArray`CREATE INDEX path_index ON paths(path)`;
    await transaction.queryArray`CREATE INDEX hash_on_paths_index ON paths(hash)`;

    for (const { packId, packName } of ICONS_LIST) {
      console.log('\n ~ saveIconsInDB ~ packName', packName);
      const downloadDirectory = './downloads';
      const unzippedDirectory = `${downloadDirectory}/unzipped`;
      const unzippedDirectoryPack = `${unzippedDirectory}/${packName}`;

      const unzippedNames = await getFiles(unzippedDirectoryPack);

      const possibleTypesRegex = /outline|solid|fill|twotone|logos|regular|(original|plain|line)(-wordmark)?/gi;
      const svgFiles = unzippedNames
        .filter(({ name, ext }) => !(name === 'bootstrap-icons.svg') && ext === 'svg')
        .map(({ name, path }) => {
          const [iconType] = path.match(possibleTypesRegex) || ['regular'];
          return { name, path, iconType };
        });

      for (const { name, path, iconType } of svgFiles) {
        i += 1;
        const { size } = await Deno.stat(path);
        let svg = await Deno.readTextFile(path);

        if (svg.includes('<?xml')) {
          const svgArray = svg.split(/\n/g);
          svgArray.shift();
          svg = svgArray.join('');
        }

        const iconName = name.replace('.svg', '').replace(/\_/g, '-');
        const bytes = prettyBytes(size);
        const svgInnerHtml = getInnerHTMLFromSvgText(svg);
        const hash = createHash(svgInnerHtml);
        await transaction.queryArray(
          `INSERT INTO icons (hash,svg,icon_type,bytes,pack_id,pack_name,icon_name,icon_file_name,found) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          hash,
          svg,
          iconType,
          bytes,
          packId,
          packName,
          iconName,
          name,
          0,
        );

        const encodedPath = encodeURIComponent(`/${packName}/${iconType}/${iconName}`);
        await transaction.queryArray(`INSERT INTO paths (path,hash) VALUES ($1, $2)`, encodedPath, hash);
      }
    }

    await transaction.commit();
  } catch (error) {
    console.log('Error on saveIconsInDB', error);
  }
  console.log('\n ~ saveIconsInDB ~ i', i);
}

/*
import { delay } from 'https://deno.land/x/delay@v0.2.0/mod.ts';
import { unZipFromFile } from 'https://deno.land/x/zip@v1.1.1/mod.ts';
import upperFirstCase from 'https://deno.land/x/case/upperFirstCase.ts';
import { download, Destination } from 'https://deno.land/x/download/mod.ts';

// .filter(({ name, ext }) => !(name === 'bootstrap-icons.svg' || name.endsWith('-preview.svg')) && ext === 'svg')

const response = await fetch`https://api.github.com/repos/${owner}/${repo}/${type}`;
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
