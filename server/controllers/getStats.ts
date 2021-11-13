import { Context } from 'https://deno.land/x/oak/mod.ts';

// lib
import { IconLibrary } from '../lib/types.ts';

// db
import { iconLibrariesTable } from '../db/iconLibraries.ts';

export const getStats = async ({ response }: Context) => {
  try {
    const { rows, rowCount } = await iconLibrariesTable.selectColumnsForStats();

    // @ts-ignore
    const result = (rows as IconLibrary[]).reduce((accumulator, row) => {
      const { total_icons: totalIcons, icon_types: iconTypes } = row;

      return {
        ...accumulator,
        totalIcons: accumulator.totalIcons + totalIcons,
        iconTypes: [...new Set([...accumulator.iconTypes, ...iconTypes])]
      }
    }, { totalIcons: 0, iconTypes: [] })


    // @ts-ignore
    const { totalIcons, iconTypes } = result

    response.status = 200;
    response.body = {
      success: true,
      data: {
        totalIcons,
        totalLibraries: rowCount,
        totalStyles: iconTypes.length
      },
    };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
};
