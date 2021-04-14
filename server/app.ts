import { Application, Router } from 'https://deno.land/x/oak/mod.ts';

// helpers
import { createSvgMap } from './helpers.ts';

// types
type PacksNames = keyof typeof ICONS_LINKS;

// constants
const svgs = await createSvgMap();

const ICONS_LINKS = {
  feather: 'https://feathericons.com',
  bootstrap: 'https://icons.getbootstrap.com',
};

function getIconLink(iconPack: PacksNames, iconName: string) {
  const links = {
    feather: (iconName: string) => `https://feathericons.com/?query=${iconName}`,
    bootstrap: (iconName: string) => `https://icons.getbootstrap.com/icons/${iconName}`,
  };
  const getIconPackLink = links[iconPack];

  return getIconPackLink(iconName);
}

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

  const isFound = svgs.has(hash);

  if (isFound) {
    const svg = svgs.get(hash);
    const pack = ICONS_LINKS[svg.pack as PacksNames];
    const icon = getIconLink(svg.pack, svg.name);
    const links = { pack, icon };

    response.status = 200;
    response.body = { success: true, data: { svg, links } };
  } else {
    response.status = 400;
    response.body = { success: false };
  }
});

// Passing Router as middleware
app.use(router.routes());
app.use(router.allowedMethods());

// Server our app
await app.listen({ port: 8000 });
