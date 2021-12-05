import getFiles from 'https://deno.land/x/getfiles/mod.ts';
import stripHtmlComments from 'https://cdn.skypack.dev/strip-html-comments';
import { prettyBytes } from 'https://raw.githubusercontent.com/brunnerlivio/deno-pretty-bytes/master/mod.ts';

// utils
import { reactIconsPacks } from './react-icons.ts';
import { getInnerHTMLFromSvgText } from './dom.ts';
import { getIconPackSnippets } from './snippets.ts';
import { createHash, createHashNumber } from './hash.ts';
import { PacksNames, ICONS_LIST, ICON_PAGE_LINK, ICON_LIBRARIES, ICONS_SOURCE_LINKS } from './constants.ts';

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
  const iconPackWebsite = ICON_LIBRARIES[svgPackName].website;
  return iconPackWebsite;
}

export function getIconPackFigmaLink(svgPackName: string) {
  const iconPackFigmaLink = ICON_LIBRARIES[svgPackName as PacksNames].figmaLink;
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

const PACKS_ICON_TYPES = {
  feather: {
    base: 'outlined',
  },
  bootstrap: {
    fill: 'solid',
    base: 'outlined',
  },
  heroicons: {
    solid: 'solid',
    outline: 'outlined',
  },
  antdesign: {
    fill: 'solid',
    outline: 'outlined',
    twotone: 'twotone',
  },
  devicon: {
    base: 'outlined',
  },
  boxicons: {
    regular: 'outlined',
  },
  flatcoloricons: {
    base: 'color',
  },
  fontawesome: {
    regular: 'outlined',
    solid: 'solid',
    brands: 'logos',
  },
};

const DEFAULT_ICON_TYPES = {
  feather: PACKS_ICON_TYPES.feather.base,
  bootstrap: PACKS_ICON_TYPES.bootstrap.base,
  heroicons: PACKS_ICON_TYPES.heroicons.outline,
  antdesign: PACKS_ICON_TYPES.antdesign.outline,
  boxicons: PACKS_ICON_TYPES.boxicons.regular,
  devicon: PACKS_ICON_TYPES.devicon.base,
  flatcoloricons: PACKS_ICON_TYPES.flatcoloricons.base,
  fontawesome: PACKS_ICON_TYPES.fontawesome.regular,
};

type IconTypes = 'base' | 'outline' | 'solid' | 'fill' | 'twotone' | 'regular';

async function saveIconLibraryInDB({ packId, packName }: { packId: string; packName: string }) {
  console.log('Began uploading packName', packName);
  const transaction2 = client.createTransaction(`tx-create-${packName}`);

  await transaction2.begin();

  const downloadDirectory = './downloads';
  const unzippedDirectory = `${downloadDirectory}/unzipped`;
  const unzippedDirectoryPack = `${unzippedDirectory}/${packName}`;

  const unzippedNames = await getFiles(unzippedDirectoryPack);

  const possibleTypesRegex = /brands|outline|solid|fill|twotone|logos|regular|(original|plain|line)(-wordmark)?/gi;
  const svgFiles = unzippedNames
    // filter file containing all the icons from bootstrap
    .filter(({ name, ext }) => !(name === 'bootstrap-icons.svg') && ext === 'svg')
    // filter variants from devicons
    .filter(({ name, realPath }) => !(realPath.includes('devicon') && name.match(/plain|original/g)))
    .map(({ name, path }) => {
      const [iconType] = path.match(possibleTypesRegex) || [DEFAULT_ICON_TYPES[packName as PacksNames]];
      return { name, path, iconType };
    });

  const totalIcons = svgFiles.length;

  for (let index = 0; index < svgFiles.length; index++) {
    // TODO: Deno is not capable of handling more than 1287 icons, so we do < 1000, and then >= 1000 for fa and bi
    if (index < 1000) {
      console.log(`Current index / ${svgFiles.length - 1}`, index);
      const { name, path, iconType } = svgFiles[index];

      const reactIconPack = reactIconsPacks[packName as PacksNames] as string[];
      const parsedIconType =
        // @ts-ignore
        PACKS_ICON_TYPES[packName as PacksNames][iconType as IconTypes] || DEFAULT_ICON_TYPES[packName as PacksNames];

      const iconNameWithoutExtension = name.replace('.svg', '');
      const iconNameWithoutDash = iconNameWithoutExtension.replace(/-|_/g, '');

      let iconNameWithSpaceWithFormattedNumber = iconNameWithoutExtension
        .replace(/-/g, ' ')
        .replace(/[0-9]/g, (match) => `(${match})`);

      let parsedIconName = iconNameWithoutDash;
      let parsedIconNameForReactIcon = iconNameWithoutDash;

      if (packName === 'boxicons') {
        const [_, ...otherParts] = iconNameWithoutExtension.split('-');
        parsedIconNameForReactIcon = otherParts.join('');
      }

      if (packName === 'heroicons') {
        const iconTypeReactIcon = iconType === 'outline' ? 'outline' : '';
        parsedIconNameForReactIcon = `${iconTypeReactIcon}${parsedIconNameForReactIcon}`;
      }

      if (packName === 'bootstrap') {
        parsedIconName = iconNameWithoutDash.replace('fill', '');
        parsedIconNameForReactIcon = `${parsedIconNameForReactIcon}`;
      }

      if (packName === 'devicon') {
        parsedIconName = iconNameWithoutExtension.split('-')[0];
        parsedIconNameForReactIcon = `${parsedIconName}`;
      }

      if (packName === 'boxicons') {
        parsedIconName = iconNameWithoutDash.slice(2);
        iconNameWithSpaceWithFormattedNumber = iconNameWithSpaceWithFormattedNumber.slice(3);
      }

      const parsedIconNameForReactIconInLowerCase = parsedIconNameForReactIcon.toLowerCase().trim();
      const value = reactIconPack.find((reactIconName) => {
        const parsedReactIconName = reactIconName.toLowerCase().trim();

        if (packName === 'heroicons') {
          if (parsedIconType === 'outlined') {
            return `hi${parsedIconNameForReactIconInLowerCase}` === parsedReactIconName;
          }

          return `hi${parsedIconNameForReactIconInLowerCase}` === parsedReactIconName;
        }

        if (packName === 'boxicons') {
          return `bi${parsedIconNameForReactIconInLowerCase}` === parsedReactIconName;
        }

        if (packName === 'bootstrap') {
          return `bs${parsedIconNameForReactIconInLowerCase}` === parsedReactIconName;
        }

        if (packName === 'antdesign') {
          return `ai${iconType}${parsedIconNameForReactIconInLowerCase}` === parsedReactIconName;
        }

        if (packName === 'feather') {
          return parsedReactIconName.slice(2) === parsedIconNameForReactIconInLowerCase;
        }

        if (packName === 'flatcoloricons') {
          return `fc${parsedIconNameForReactIconInLowerCase.replace(/_/g, '')}` === parsedReactIconName;
        }

        if (packName === 'fontawesome') {
          if (parsedIconType === 'outlined') {
            return parsedReactIconName === `fareg${parsedIconNameForReactIconInLowerCase}`;
          }

          return `fa${parsedIconNameForReactIconInLowerCase}` === parsedReactIconName;
        }

        return parsedReactIconName.includes(parsedIconNameForReactIconInLowerCase);
      });

      if (!value) {
        console.log(`no value found for ${parsedIconNameForReactIconInLowerCase} in ${packName}`, value);
      }

      const reactIconName = value as string;

      const { size } = await Deno.stat(path);

      let svg = await Deno.readTextFile(path);

      svg = stripHtmlComments(svg);

      if (svg.startsWith('<?xml')) {
        const svgArray = svg.split(/\n/g);
        svgArray.shift();
        svg = svgArray.join('');
      }

      if (svg.includes('<!DOCTYPE')) {
        svg = svg.replace(
          '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">',
          '',
        );
      }

      const bytes = prettyBytes(size);
      const { innerSvg, viewBox } = getInnerHTMLFromSvgText(svg);

      const hash = createHash(innerSvg);
      const hashNumber = createHashNumber(hash);
      const id = hash.slice(0, 4);

      const iconName = parsedIconName;
      const iconParsedName = iconNameWithSpaceWithFormattedNumber;

      await transaction2.queryArray(
        `INSERT INTO icons (id,hash,hash_number,svg,inner_svg,view_box,icon_type,bytes,pack_id,pack_name,icon_parsed_name,icon_name,react_icon_name,icon_file_name) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`,
        id,
        hash,
        hashNumber,
        svg,
        innerSvg,
        viewBox,
        parsedIconType,
        bytes,
        packId,
        packName,
        iconParsedName,
        iconName,
        reactIconName,
        name,
      );

      const encodedPath = encodeURIComponent(`/${packName}/${parsedIconType}/${iconName}`);
      await transaction2.queryArray(`INSERT INTO paths (path,hash) VALUES ($1, $2)`, encodedPath, hash);

      // snippets
      const snippets = await getIconPackSnippets(
        svg,
        innerSvg,
        viewBox,
        iconParsedName,
        iconName,
        packName as PacksNames,
        packId,
        reactIconName,
        iconType,
      );

      await transaction2.queryArray(
        `INSERT INTO snippets (hash, snippet) VALUES ($1, $2)`,
        hash,
        JSON.stringify(snippets),
      );
    }
  }

  /*   // icon libraries
  const { license, stars, version, iconTypes, website, downloadLink, parsedName, figmaLink, githubLink, contributors } =
    ICON_LIBRARIES[packName as PacksNames];
  await transaction2.queryArray(
    `INSERT INTO icon_libraries (name, parsed_name, total_icons, license, stars, version, icon_types, website, download_link, figma_link, github_link, contributors) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
    packName,
    parsedName,
    totalIcons,
    license,
    stars,
    version,
    iconTypes,
    website,
    downloadLink,
    figmaLink,
    githubLink,
    contributors,
  ); */

  await transaction2.commit();

  console.log(`finished ${packName}`);
}

export async function saveIconsInDB() {
  try {
    /*  // cleanup icon_libraries
    const transaction = client.createTransaction('tx-create-db');
    await transaction.begin();

    await transaction.queryArray`DROP TABLE icon_libraries`;
    await transaction.queryArray`CREATE TABLE icon_libraries (name TEXT, parsed_name TEXT, total_icons INTEGER, license TEXT, stars TEXT, version TEXT, website TEXT, download_link TEXT, figma_link TEXT, github_link TEXT, contributors INTEGER, icon_types TEXT[][])`;

    await transaction.commit();
 */

    /* const transaction = client.createTransaction('tx-create-db');

    await transaction.begin();

    // remove existing tables
    await transaction.queryArray`DROP TABLE icons`;
    await transaction.queryArray`DROP TABLE paths`;
    await transaction.queryArray`DROP TABLE tags`;
    await transaction.queryArray`DROP TABLE tags_icons`;
    // await transaction.queryArray`DROP TABLE icon_libraries`;
    await transaction.queryArray`DROP TABLE contacts`;
    await transaction.queryArray`DROP TABLE snippets`;

    // create tables
    await transaction.queryArray`CREATE TABLE contacts (email TEXT, name TEXT, message TEXT)`;

    await transaction.queryArray`CREATE TABLE tags (id TEXT, name TEXT)`;
    await transaction.queryArray`CREATE TABLE tags_icons (hash TEXT, tag_id TEXT)`;

    await transaction.queryArray`CREATE TABLE paths (path TEXT, hash TEXT)`;
    await transaction.queryArray(
      `CREATE TABLE icons (id TEXT, hash TEXT, hash_number INTEGER, svg TEXT, inner_svg TEXT, view_box TEXT, icon_type TEXT, bytes TEXT, pack_id TEXT, pack_name TEXT, icon_parsed_name TEXT, icon_name TEXT, react_icon_name TEXT, icon_file_name TEXT)`,
    );

    // await transaction.queryArray`CREATE TABLE icon_libraries (name TEXT, parsed_name TEXT, total_icons INTEGER, license TEXT, stars TEXT, version TEXT, website TEXT, download_link TEXT, figma_link TEXT, github_link TEXT, contributors INTEGER, icon_types TEXT[][])`;
    await transaction.queryArray`CREATE TABLE snippets (hash TEXT, snippet JSON)`;

    // generate indexes
    await transaction.queryArray`CREATE INDEX hash_index ON icons(hash)`;

    await transaction.queryArray`CREATE INDEX path_index ON paths(path)`;
    await transaction.queryArray`CREATE INDEX hash_on_paths_index ON paths(hash)`;

    await transaction.queryArray`CREATE INDEX hash_on_snippet_index ON snippets(HASH)`;

    await transaction.commit(); */

    for await (const { packId, packName } of ICONS_LIST) {
      await saveIconLibraryInDB({ packId, packName });
    }

    console.log(`finished ALL`);
  } catch (error) {
    console.log('Error on saveIconsInDB', error);
  }
}
