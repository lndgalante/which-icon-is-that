import { Context } from 'https://deno.land/x/oak/mod.ts';
import { ld } from 'https://deno.land/x/deno_lodash/mod.ts';

// db
import { tagsTable } from '../db/tags.ts';

export const getTags = async ({ params, response }: Context & { params: { hash: string } }) => {
  const { hash } = params;

  if (!hash) {
    response.status = 400;
    response.body = { success: false, message: 'No hash provided' };
    return;
  }

  try {
    const { rows, rowCount } = await tagsTable.selectAllTagsByHash(hash);

    if (rowCount === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No tags found' };
      return;
    }

    const tags = ld
      .uniqBy(rows, 'name')
      .map(({ name, tag_id }: { name: string; tag_id: string }) => ({ name, tag_id }));

    response.status = 200;
    response.body = {
      success: true,
      data: { tags },
    };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
};
