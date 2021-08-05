import { Context } from 'https://deno.land/x/oak/mod.ts';

// lib
import { IconLibrary } from '../lib/types.ts';

// db
import { iconLibrariesTable } from '../db/iconLibraries.ts';

export const getIconLibraries = async ({ params, response }: Context & { params: { libraryName: string } }) => {
  const { libraryName } = params;

  if (!libraryName) {
    response.status = 400;
    response.body = { success: false, message: 'No icon library name provided' };
    return;
  }

  try {
    const { rows, rowCount } = await iconLibrariesTable.selectIconLibraryByName(libraryName);

    if (rowCount === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No icon found' };
      return;
    }

    const [
      {
        name,
        stars,
        version,
        license,
        website,
        download_link: downloadLink,
        total_icons: totalIcons,
        icon_types: iconTypes,
      },
    ] = rows as [IconLibrary];

    response.status = 200;
    response.body = {
      success: true,
      data: { name, stars, version, license, website, downloadLink, totalIcons, iconTypes },
    };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
};
