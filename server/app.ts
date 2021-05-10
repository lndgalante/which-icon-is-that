import { oakCors } from 'https://deno.land/x/cors/mod.ts';
import { parse } from 'https://deno.land/std/flags/mod.ts';
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

import { Svg } from './types.ts';
import { connectToPostgres } from './postgres.ts';
import { saveIconsInDB, getIconLink, getIconPackWebsite, getIconSource, getIconPackFigmaLink } from './icons.ts';

// env
const ENV = Deno.env.get('ENVIRONMENT') as string;
const origin = ENV === 'development' ? 'http://localhost:3001' : 'https://www.whichiconisthat.com';

// port
const DEFAULT_PORT = 8000;
const argPort = parse(Deno.args).port;

// server
const app = new Application();
const router = new Router();

// postgres
const client = await connectToPostgres();

// we will run this every now and then
// await saveIconsInDB(client);

router.get('/icon/:hash', async ({ params, response }) => {
  const { hash } = params;

  if (!hash) {
    response.status = 400;
    response.body = { success: false, message: 'No hash provided' };
    return;
  }

  try {
    const { rows, rowCount } = await client.queryObject(`SELECT * FROM icons WHERE hash = $1`, hash);

    if (rowCount === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No icon found' };
      return;
    }

    const [
      {
        svg,
        bytes,
        pack_id: packId,
        pack_name: packName,
        icon_type: iconType,
        icon_name: iconName,
        icon_file_name: iconFileName,
      },
    ] = rows as [Svg];

    const pack = getIconPackWebsite(packName);
    const figma = getIconPackFigmaLink(packName);
    const icon = getIconLink(packName, iconName);
    const source = getIconSource(packName, iconFileName, iconType);

    response.status = 200;
    response.body = {
      success: true,
      data: {
        links: { pack, icon, source, figma },
        svg: { hash, svg, iconType, bytes, packId, packName, iconName, iconFileName },
      },
    };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
});

router.put('/icon/:hash', async ({ params, response }) => {
  try {
    const { hash } = params;
    const transaction = client.createTransaction('tx-increment');

    await transaction.begin();
    await transaction.queryArray(`UPDATE icons SET found = found + 1 WHERE hash = $1`, hash);
    await transaction.commit();

    response.status = 200;
    response.body = { success: true, data: { message: 'Icon found!' } };
  } catch (error) {
    console.log('Error incrementing number', error);
    response.status = 500;
  }
});

router.get('/icon/:hash/found', async ({ params, response }) => {
  const { hash } = params;

  if (!hash) {
    response.status = 400;
    response.body = { success: false, message: 'No hash provided' };
    return;
  }

  try {
    const { rows, rowCount } = await client.queryObject(`SELECT found FROM icons WHERE hash = $1`, hash);

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
});

router.get('/paths', async ({ response }) => {
  try {
    const { rows, rowCount } = await client.queryObject(`SELECT pack_name, icon_type, icon_name FROM icons`);

    if (rowCount === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No icon found' };
      return;
    }

    const paths = rows.map((icon) => {
      const { pack_name: packName, icon_type: iconType, icon_name: iconName } = icon;
      return { params: { packName, iconType, iconName } };
    });

    response.status = 200;
    response.body = { success: true, data: { paths } };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
});

router.get('/reverse', async ({ request, response }) => {
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
      const { rows, rowCount } = await client.queryObject(`SELECT hash FROM paths WHERE path = $1`, encodedPath);

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
      const { rows, rowCount } = await client.queryObject(`SELECT path FROM paths WHERE hash = $1`, hash);

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
});

// Add middlewares
app.use(oakCors({ origin }));
app.use(router.routes());
app.use(router.allowedMethods());

// Server our app
await app.listen({ port: argPort ? Number(argPort) : DEFAULT_PORT });
