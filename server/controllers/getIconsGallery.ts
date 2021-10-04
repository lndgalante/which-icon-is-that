import { Context } from 'https://deno.land/x/oak/mod.ts';
import { ld } from 'https://deno.land/x/deno_lodash/mod.ts';

// db
import { iconTable } from '../db/icon.ts';

export const getIconsGallery = async ({ response }: Context) => {
  try {
    const { rows } = await iconTable.selectColumnsForGallery();

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
          // @ts-ignore
          return { ...accumulator, [row.packName]: [...(accumulator[row.packName] || []), ld.omit(row, 'packName')] };
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
