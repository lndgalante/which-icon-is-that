import { Context } from 'https://deno.land/x/oak/mod.ts';

// lib
import { IconLibrary } from '../lib/types.ts';

// db
import { iconLibrariesTable } from '../db/iconLibraries.ts';

export const getIconLibrary = async ({ params, response }: Context & { params: { iconLibrary: string } }) => {
  const { iconLibrary } = params;

  if (!iconLibrary) {
    response.status = 400;
    response.body = { success: false, message: 'No icon library name provided' };
    return;
  }

  try {
    const { rows, rowCount } = await iconLibrariesTable.selectIconLibraryByName(iconLibrary);

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
        icon_types: iconTypes,
        total_icons: totalIcons,
        parsed_name: parsedName,
        download_link: downloadLink,
      },
    ] = rows as [IconLibrary];

    response.status = 200;
    response.body = {
      success: true,
      data: { name, parsedName, stars, version, license, website, downloadLink, totalIcons, iconTypes },
    };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
};
