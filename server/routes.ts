import { Router } from 'https://deno.land/x/oak/mod.ts';

// controllers
import { getTags } from './controllers/getTags.ts';
import { getIcon } from './controllers/getIcon.ts';
import { putIcon } from './controllers/putIcon.ts';
import { getPaths } from './controllers/getPaths.ts';
import { getReverse } from './controllers/getReverse.ts';
import { getSimilarIcons } from './controllers/getSimilarIcons.ts';
import { getIconSnippets } from './controllers/getIconSnippets.ts';
import { getFoundTimesIcon } from './controllers/getFoundTimesIcon.ts';

const router = new Router();

router
  .get('/icon/:hash', getIcon)
  .put('/icon/:hash', putIcon)
  .get('/icon/:hash/tags', getTags)
  .get('/icon/:hash/found', getFoundTimesIcon)
  .get('/icon/:hash/snippets', getIconSnippets)
  .get('/icon/:hash/:tagId/similar', getSimilarIcons)
  .get('/paths', getPaths)
  .get('/reverse', getReverse);

export { router };
