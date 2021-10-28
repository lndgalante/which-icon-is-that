import { Context } from 'https://deno.land/x/oak/mod.ts';

// db
import { iconTable } from '../db/icon.ts';

export const getIconTypes = async ({
  params,
  response,
}: Context & { params: { iconName: string; packName: string } }) => {
  const { iconName, packName } = params;

  if (!iconName && !packName) {
    response.status = 400;
    response.body = { success: false, message: 'No iconName and packName provided' };
    return;
  }

  try {
    const { rows, rowCount } = await iconTable.selectColumnsForTypes(iconName, packName);

    if (rowCount === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No icon types found' };
      return;
    }

    // @ts-ignore
    const iconTypes = rows.map(({ icon_type }: { icon_type: string }) => icon_type);

    response.status = 200;
    response.body = {
      success: true,
      data: { iconTypes },
    };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
};
