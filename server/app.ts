import { Md5 } from 'https://deno.land/std/hash/md5.ts';
import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { prettyBytes } from 'https://raw.githubusercontent.com/brunnerlivio/deno-pretty-bytes/master/mod.ts';

// types
type PacksNames = keyof typeof LINKS;

// constants
const LINKS = {
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

// helpers
const getByteSize = (value: string) => new TextEncoder().encode(value).length;

const createHash = (value: string): string => new Md5().update(value.replace(/\s/g, '')).toString();

// main logic
async function createSvgsMap() {
  const svgs = new Map();
  const iconsFolderName = 'icons';

  for await (const iconPackFolder of Deno.readDir(iconsFolderName)) {
    const { name: iconPackFolderName, isDirectory } = iconPackFolder;

    if (isDirectory) {
      for await (const icon of Deno.readDir(`${iconsFolderName}/${iconPackFolderName}`)) {
        const { name: iconFileName } = icon;
        const name = iconFileName.replace('.svg', '');
        const path = `${iconsFolderName}/${iconPackFolderName}/${iconFileName}`;

        const { size } = await Deno.stat(path);
        const svg = await Deno.readTextFile(path);
        const bytes = prettyBytes(size);

        svgs.set(createHash(svg), {
          svg,
          name,
          bytes,
          fileName: iconFileName,
          pack: iconPackFolderName,
        });
      }
    }
  }

  return svgs;
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

  const svgs = await createSvgsMap();
  const isFound = svgs.has(hash);

  if (isFound) {
    const svg = svgs.get(hash);
    const pack = LINKS[svg.pack as PacksNames];
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
