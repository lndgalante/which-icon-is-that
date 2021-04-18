import { parse } from 'https://deno.land/std/flags/mod.ts';
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

// helpers
import { connectToRedis } from './redis.ts';
import { getIconLink, getIconPackWebsite, getIconSource } from './icons.ts';
// import { preloadData } from './preload.ts';

// initial data
const redis = await connectToRedis();
// await preloadData(redis);

// port
const DEFAULT_PORT = 8000;
const argPort = parse(Deno.args).port;

// server
const app = new Application();
const router = new Router();

router.post('/icon', async ({ request, response }) => {
  const body = await request.body();
  const values = await body.value;
  const hash = JSON.parse(values)?.hash;

  if (!request.hasBody || !hash) {
    response.status = 400;
    response.body = { success: false, message: 'No data provided' };
    return;
  }

  try {
    const svgJson = await redis.get(hash);
    const isFound = typeof svgJson !== 'undefined';

    if (isFound) {
      const svg = JSON.parse(svgJson as string);
      const { packName, iconName, iconFileName } = svg;

      const pack = getIconPackWebsite(packName);
      const icon = getIconLink(packName, iconName);
      const source = getIconSource(packName, iconFileName);
      const links = { pack, icon, source };

      response.status = 200;
      response.body = { success: true, data: { svg, links } };
    } else {
      response.status = 404;
      response.body = { success: false };
    }
  } catch (error) {
    console.log('Error finding icon', error);
    response.status = 500;
    response.body = { success: false };
  }
});

// Passing Router as middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Server our app
await app.listen({ port: argPort ? Number(argPort) : DEFAULT_PORT });
