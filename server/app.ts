import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

// helpers
import { preloadData } from './preload.ts';
import { connectToRedis } from './redis.ts';
import { getIconLink, getIconPackWebsite } from './icons.ts';

// initial data
const redis = await connectToRedis();
await preloadData(redis);

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
      const svg = JSON.parse(svgJson);
      const { pack: iconPackName, name: iconName } = svg;

      const pack = getIconPackWebsite(iconPackName);
      const icon = getIconLink(iconPackName, iconName);
      const links = { pack, icon };

      response.status = 200;
      response.body = { success: true, data: { svg, links } };
    } else {
      response.status = 404;
      response.body = { success: false };
    }
  } catch (error) {
    response.status = 500;
    response.body = { success: false };
  }
});

// Passing Router as middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Server our app
await app.listen({ port: 8000 });
