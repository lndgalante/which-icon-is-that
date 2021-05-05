import { parse } from 'https://deno.land/std/flags/mod.ts';
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

// helpers
import { connectToPostgres } from './postgres.ts';
import { saveIconsInDB, getIconLink, getIconPackWebsite, getIconSource, getIconPackFigmaLink, Svg } from './icons.ts';

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

router.get('/icon', async ({ request, response }) => {
  const hash = await request.url.searchParams.get('hash');

  if (!hash) {
    response.status = 400;
    response.body = { success: false, message: 'No hash provided' };
    return;
  }

  try {
    const { rows, rowCount } = await client.queryArray(`SELECT row_to_json(icons) FROM icons WHERE hash = '${hash}'`);

    if (rowCount === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No icon found' };
      return;
    }

    const {
      svg,
      type,
      bytes,
      pack_id: packId,
      pack_name: packName,
      icon_name: iconName,
      icon_file_name: iconFileName,
    } = rows[0][0] as Svg;

    const pack = getIconPackWebsite(packName);
    const figma = getIconPackFigmaLink(packName);
    const icon = getIconLink(packName, iconName);
    const source = getIconSource(packName, iconFileName);

    response.status = 200;
    response.body = {
      success: true,
      data: {
        links: { pack, icon, source, figma },
        svg: { hash, svg, type, bytes, packId, packName, iconName, iconFileName },
      },
    };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
});

// Passing Router as middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Server our app
await app.listen({ port: argPort ? Number(argPort) : DEFAULT_PORT });
