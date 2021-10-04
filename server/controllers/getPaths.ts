import { Context } from 'https://deno.land/x/oak/mod.ts';

// db
import { iconTable } from '../db/icon.ts';

export const getPaths = async ({ response }: Context) => {
  try {
    const { rows, rowCount } = await iconTable.selectColumnsForPaths();

    if (rowCount === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No icon found' };
      return;
    }

    const paths = rows.map((icon) => {
      // @ts-ignore
      const { pack_name: packName, icon_type: iconType, icon_name: iconName, react_icon_name: reactIconName } = icon;
      return { params: { packName, iconType, iconName, reactIconName } };
    });

    response.status = 200;
    response.body = { success: true, data: { paths } };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
};
