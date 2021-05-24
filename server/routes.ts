import { Router } from 'https://deno.land/x/oak/mod.ts';

// controllers
import { getIcon } from './controllers/getIcon.ts';
import { putIcon } from './controllers/putIcon.ts';
import { getPaths } from './controllers/getPaths.ts';
import { getReverse } from './controllers/getReverse.ts';
import { getIconSnippets } from './controllers/getIconSnippets.ts';
import { getFoundTimesIcon } from './controllers/getFoundTimesIcon.ts';

const router = new Router();

router
  .get('/icon/:hash', getIcon)
  .put('/icon/:hash', putIcon)
  .get('/icon/:hash/found', getFoundTimesIcon)
  .get('/icon/:hash/snippets', getIconSnippets)
  .get('/paths', getPaths)
  .get('/reverse', getReverse);

export { router };
