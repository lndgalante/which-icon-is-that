import { Router } from 'https://deno.land/x/oak/mod.ts';

// controllers
import { getTags } from './controllers/getTags.ts';
import { getIconTypes } from './controllers/getIconTypes.ts';
import { getPaths } from './controllers/getPaths.ts';
import { getReverse } from './controllers/getReverse.ts';
import { getIconByHash } from './controllers/getIconByHash.ts';
import { getIconLibrary } from './controllers/getIconLibrary.ts';
import { getSimilarIcons } from './controllers/getSimilarIcons.ts';
import { getIconSnippets } from './controllers/getIconSnippets.ts';
import { getIconsGallery } from './controllers/getIconsGallery.ts';
import { getFoundTimesIcon } from './controllers/getFoundTimesIcon.ts';
import { getIconsByIconNameAndIconLibrary } from './controllers/getIconsByIconNameAndIconLibrary.ts';

import { putIcon } from './controllers/putIcon.ts';
import { postContact } from './controllers/postContact.ts';

const router = new Router();

router
  /* Used on home page on drag and drop functionality that gets a path from a hash or viceversa  */
  .get('/reverse', getReverse)

  /* Used on icon page for ISR to create all icon pages statically */
  .get('/paths', getPaths)

  /* Used on icon page on ISR */
  .get('/icon/:hash', getIconByHash)
  /* Used on icon page to increment the view of that icon */
  .put('/icon/:hash', putIcon)

  /* Used on icon page to get tags from that icon */
  .get('/icon/:hash/tags', getTags)
  /* Used on icon page to get similar icons based on a certain tag */
  .get('/icon/:hash/:tagId/similar', getSimilarIcons)

  /* Used on icon page to get icon types */
  .get('/icon/:iconName/:packName/types', getIconTypes)

  /* Used on icon page to get total found times */
  .get('/icon/:hash/found', getFoundTimesIcon)
  /* Used on icon page on developer panel to get all snippets per library */
  .get('/icon/:hash/snippets', getIconSnippets)

  /* Used on the icon page to get all the library metadata  */
  .get('/icon/library/:iconLibrary', getIconLibrary)

  /* Used on gallery page to get all the initial icons */
  .get('/icons/gallery', getIconsGallery)
  /* Used on gallery page to get all the icons by icon name and icon library */
  .get('/icons/find/:iconLibrary/:iconName?', getIconsByIconNameAndIconLibrary)

  /* Used on contact page or pricing modal */
  .post('/contact', postContact);

export { router };
