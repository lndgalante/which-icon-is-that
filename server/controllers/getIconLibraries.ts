import { Context } from 'https://deno.land/x/oak/mod.ts';

// lib
import { IconLibrary } from '../lib/types.ts';

// db
import { iconLibrariesTable } from '../db/iconLibraries.ts';

export const getIconLibraries = async ({ response }: Context) => {
  try {
    const { rows, rowCount } = await iconLibrariesTable.selectAllIconLibraries();

    if (rowCount === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No icon found' };
      return;
    }

    const iconLibraries = (rows as IconLibrary[]).map((iconLibrary) => {
      const { parsed_name, total_icons, download_link, figma_link, github_link, icon_types, ...otherKeys } =
        iconLibrary;

      return {
        parsedName: parsed_name,
        totalIcons: total_icons,
        downloadLink: download_link,
        iconTypes: icon_types,
        githubLink: github_link,
        figmaLink: figma_link,
        ...otherKeys,
      };
    });

    response.status = 200;
    response.body = {
      success: true,
      data: { iconLibraries },
    };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
};
