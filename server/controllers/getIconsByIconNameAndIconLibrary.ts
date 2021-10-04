import { Context } from 'https://deno.land/x/oak/mod.ts';
import { ld } from 'https://deno.land/x/deno_lodash/mod.ts';

// db
import { iconTable } from '../db/icon.ts';

export const getIconsByIconNameAndIconLibrary = async ({
  params,
  response,
}: Context & { params: { iconName: string; iconLibrary: string } }) => {
  const { iconName = '', iconLibrary = '' } = params;

  try {
    const { rows, rowCount } = await iconTable.selectIconsByIconNameAndIconLibrary(iconName, iconLibrary);

    if (rowCount === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No icons found' };
      return;
    }

    const svgs = Object.entries(
      // @ts-ignore
      rows
        // @ts-ignore
        .map(({ icon_name, icon_type, react_icon_name, pack_name }) => ({
          packName: pack_name,
          iconName: icon_name,
          iconType: icon_type,
          reactIconName: react_icon_name,
        }))
        // @ts-ignore
        .reduce((accumulator, row) => {
          return {
            // @ts-ignore
            ...accumulator,
            // @ts-ignore
            [row.packName]: [...(accumulator[row.packName] || []), ld.omit(row, 'packName')],
          };
        }, {}),
    );

    response.status = 200;
    response.body = {
      success: true,
      data: { svgs },
    };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
};
