import { Context } from 'https://deno.land/x/oak/mod.ts';

// db
import { iconTable } from '../db/icon.ts';

// lib
import { Svg } from '../lib/types.ts';

export const getPackRelatedIcons = async ({
  params,
  response,
}: Context & { params: { hash: string; packName: string; hashNumber: string } }) => {
  const { hash, packName, hashNumber } = params;

  if (!hash && !packName) {
    response.status = 400;
    response.body = { success: false, message: 'No hash or packName provided' };
    return;
  }

  try {
    const { rows, rowCount } = await iconTable.selectColumnsForSimilarIcons(hash, packName, hashNumber);

    /*   if (rowCount === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No related icons found' };
      return;
    } */

    const relatedIcons = (rows as [Svg]).map(
      ({ icon_name: iconName, icon_type: iconType, react_icon_name: reactIconName }) => ({
        iconName,
        packName,
        iconType,
        reactIconName,
      }),
    );

    response.status = 200;
    response.body = {
      success: true,
      data: { relatedIcons },
    };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
};
