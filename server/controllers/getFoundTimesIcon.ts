import { Context } from 'https://deno.land/x/oak/mod.ts';

// lib
import { Svg } from '../lib/types.ts';

// db
import { iconTable } from '../db/icon.ts';
export const getFoundTimesIcon = async ({ params, response }: Context & { params: { hash: string } }) => {
  const { hash } = params;

  if (!hash) {
    response.status = 400;
    response.body = { success: false, message: 'No hash provided' };
    return;
  }

  try {
    const { rows, rowCount } = await iconTable.selectFoundTimesByHash(hash);

    if (rowCount === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No icon found' };
      return;
    }

    const [{ found }] = rows as [Pick<Svg, 'found'>];

    response.status = 200;
    response.body = { success: true, data: { found } };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
};
