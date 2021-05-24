import { Context } from 'https://deno.land/x/oak/mod.ts';

// db
import { hashTable } from '../db/hash.ts';

export const getReverse = async ({ request, response }: Context) => {
  const { searchParams } = request.url;
  const [hash, path] = [await searchParams.get('hash'), await searchParams.get('path')];

  if (!hash && !path) {
    response.status = 400;
    response.body = { success: false, message: 'No hash or path provided' };
    return;
  }

  try {
    if (path) {
      const encodedPath = encodeURIComponent(path);
      const { rows, rowCount } = await hashTable.selectHashByPath(encodedPath);

      if (rowCount === 0) {
        response.status = 404;
        response.body = { success: false, message: 'No hash found' };
        return;
      }

      const [{ hash }] = rows;

      response.status = 200;
      response.body = { success: true, data: { result: hash } };
    }

    if (hash) {
      const { rows, rowCount } = await await hashTable.selectPathByHash(hash);

      if (rowCount === 0) {
        response.status = 404;
        response.body = { success: false, message: 'No path found' };
        return;
      }

      const [{ path }] = rows;

      response.status = 200;
      response.body = { success: true, data: { result: path } };
    }
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
};
