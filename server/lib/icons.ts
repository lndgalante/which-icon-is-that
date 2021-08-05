import getFiles from 'https://deno.land/x/getfiles/mod.ts';
import { pascalCase } from 'https://deno.land/x/case/mod.ts';
import { prettyBytes } from 'https://raw.githubusercontent.com/brunnerlivio/deno-pretty-bytes/master/mod.ts';

// helpers
import { createHash } from './hash.ts';
import { getInnerHTMLFromSvgText } from './dom.ts';
import {
  PacksNames,
  ICONS_LIST,
  ICON_PAGE_LINK,
  ICON_LIBRARIES,
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

export async function generateIconNameSynonym(iconName: string): Promise<string[]> {
  // TODO: Temporary fix until synonym has Deno support
  const p = Deno.run({
    cmd: ['node', './lib/synonyms.js', iconName],
    stdout: 'piped',
    stderr: 'piped',
  });

  const rawOutput = await p.output();
  const rawError = await p.stderrOutput();

  const outputString = new TextDecoder().decode(rawOutput);
  const result = JSON.parse(outputString);

  const [synonyms] = result;

  return synonyms;
}

let i = 0;

export async function saveIconsInDB() {
  try {
    const transaction = client.createTransaction('tx-create-db');

    await transaction.begin();

    // remove existing tables
    await transaction.queryArray`DROP TABLE icons`;
    await transaction.queryArray`DROP TABLE paths`;
    await transaction.queryArray`DROP TABLE tags`;
    await transaction.queryArray`DROP TABLE tags_icons`;
    await transaction.queryArray`DROP TABLE icon_libraries`;

    // create tables
    await transaction.queryArray`CREATE TABLE tags (id TEXT, name TEXT)`;
    await transaction.queryArray`CREATE TABLE tags_icons (hash TEXT, tag_id TEXT)`;

    await transaction.queryArray`CREATE TABLE paths (path TEXT, hash TEXT)`;
    await transaction.queryArray(
      `CREATE TABLE icons (hash TEXT, svg TEXT, inner_svg TEXT, view_box TEXT, icon_type TEXT, bytes TEXT, pack_id TEXT, pack_name TEXT, icon_parsed_name TEXT, icon_name TEXT, react_icon_name TEXT, icon_file_name TEXT, found SERIAL)`,
    );
    await transaction.queryArray`CREATE TABLE icon_libraries (name TEXT, total_icons INTEGER, license TEXT, stars TEXT, version TEXT, website TEXT, download_link TEXT, icon_types TEXT[][])`;

    // generate indexes
    await transaction.queryArray`CREATE INDEX hash_index ON icons(hash)`;

    await transaction.queryArray`CREATE INDEX path_index ON paths(path)`;
    await transaction.queryArray`CREATE INDEX hash_on_paths_index ON paths(hash)`;

    await transaction.queryArray`CREATE INDEX hash_index_on_tags ON tags_icons(hash)`;
    await transaction.queryArray`CREATE INDEX hash_on_tag_id_index ON tags_icons(tag_id)`;

    for (const { name, totalIcons, license, stars, version, iconTypes, website, downloadLink } of ICON_LIBRARIES) {
      console.log('\n ~ saveIconsInDB ~ downloadLink', downloadLink);
      await transaction.queryArray(
        `INSERT INTO icon_libraries (name, total_icons, license, stars, version, icon_types, website, download_link) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        name,
        totalIcons,
        license,
        stars,
        version,
        iconTypes,
        website,
        downloadLink,
      );
    }

    for (const { packId, packName } of ICONS_LIST) {
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

        let reactIconName = '';
        if (packName === 'feather') {
          reactIconName = `Fi${pascalCase(name.replace('svg', ''))}`;
        }
        if (packName === 'heroicons') {
          const iconTypeReactIcon = iconType === 'outline' ? 'Outline' : '';
          reactIconName = `Hi${iconTypeReactIcon}${pascalCase(name.replace('svg', ''))}`;
        }

        const { size } = await Deno.stat(path);

        let svg = await Deno.readTextFile(path);

        if (svg.includes('<?xml')) {
          const svgArray = svg.split(/\n/g);
          svgArray.shift();
          svg = svgArray.join('');
        }

        const bytes = prettyBytes(size);
        const { innerSvg, viewBox } = getInnerHTMLFromSvgText(svg);
        const hash = createHash(innerSvg);

        const iconName = name.replace('.svg', '').replace(/\_/g, '-');
        const iconParsedName = iconName.replace(/-/g, ' ');
        const synonyms = await generateIconNameSynonym(iconName);

        if (synonyms) {
          if (Array.isArray(synonyms)) {
            const parsedSynonyms = synonyms.filter((synonym) => synonym.length !== 1);
            for (const synonym of parsedSynonyms) {
              const synonymId = createHash(synonym);
              await transaction.queryArray(`INSERT INTO tags (id, name) VALUES ($1, $2)`, synonymId, synonym);
              await transaction.queryArray(`INSERT INTO tags_icons (hash, tag_id) VALUES ($1, $2)`, hash, synonymId);
            }
          } else {
            const synonymId = createHash(synonyms);
            await transaction.queryArray(`INSERT INTO tags (id, name) VALUES ($1, $2)`, synonymId, synonyms);
            await transaction.queryArray(`INSERT INTO tags_icons (hash, tag_id) VALUES ($1, $2)`, hash, synonymId);
          }
        }

        await transaction.queryArray(
          `INSERT INTO icons (hash,svg,inner_svg,view_box,icon_type,bytes,pack_id,pack_name,icon_parsed_name,icon_name,react_icon_name,icon_file_name,found) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
          hash,
          svg,
          innerSvg,
          viewBox,
          iconType,
          bytes,
          packId,
          packName,
          iconParsedName,
          iconName,
          reactIconName,
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
