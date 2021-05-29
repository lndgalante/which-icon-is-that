import { Context } from 'https://deno.land/x/oak/mod.ts';

// db
import { tagsTable } from '../db/tags.ts';
import { iconTable } from '../db/icon.ts';

export const getSimilarIcons = async ({ params, response }: Context & { params: { hash: string; tagId: string } }) => {
  const { hash, tagId } = params;

  if (!tagId && !hash) {
    response.status = 400;
    response.body = { success: false, message: 'No tag id or hash provided' };
    return;
  }

  try {
    const { rows, rowCount } = await tagsTable.selectAllIconsByTagId(tagId);

    if (rowCount === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No tags found' };
      return;
    }

    const hashes = rows.map(({ hash }) => hash) as string[];
    const { rows: rowsIcons, rowCount: rowCountIcons } = await iconTable.selectAllByHashes(hashes);

    if (rowCountIcons === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No icons found' };
      return;
    }

    const icons = rowsIcons.filter((icon) => icon.hash !== hash);

    response.status = 200;
    response.body = {
      success: true,
      data: { icons },
    };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
};
