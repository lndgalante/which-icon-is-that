import { Context } from 'https://deno.land/x/oak/mod.ts';

// db
import { iconTable } from '../db/icon.ts';

// lib
import { Svg } from '../lib/types.ts';
import { createHashNumber } from '../lib/hash.ts';

export const getNotFoundIconRelatedIcons = async ({ params, response }: Context & { params: { hash: string } }) => {
  const { hash } = params;

  if (!hash) {
    response.status = 400;
    response.body = { success: false, message: 'No hash provided' };
    return;
  }

  try {
    const hashNumber = createHashNumber(hash);
    const { rows, rowCount } = await iconTable.selectColumnsForSimilarIconsNotFound(hash, hashNumber);

    if (rowCount === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No related icons found' };
      return;
    }

    const relatedIcons = (rows as [Svg]).map(
      ({ icon_name: iconName, icon_type: iconType, react_icon_name: reactIconName, pack_name: packName }) => ({
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
