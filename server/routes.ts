import { Router } from 'https://deno.land/x/oak/mod.ts';

// controllers
import { getTags } from './controllers/getTags.ts';
import { getStats } from './controllers/getStats.ts';
import { getPaths } from './controllers/getPaths.ts';
import { getReverse } from './controllers/getReverse.ts';
import { getIconTypes } from './controllers/getIconTypes.ts';
import { getIconByHash } from './controllers/getIconByHash.ts';
import { getIconLibrary } from './controllers/getIconLibrary.ts';
import { getIconLibraries } from './controllers/getIconLibraries.ts';
import { getSimilarIcons } from './controllers/getSimilarIcons.ts';
import { getIconSnippets } from './controllers/getIconSnippets.ts';
import { getIconsGallery } from './controllers/getIconsGallery.ts';
import { getPackRelatedIcons } from './controllers/getPackRelatedIcons.ts';
import { getNotFoundIconRelatedIcons } from './controllers/getNotFoundIconRelatedIcons.ts';
import { getIconsByIconNameAndIconLibrary } from './controllers/getIconsByIconNameAndIconLibrary.ts';

import { postContact } from './controllers/postContact.ts';

const router = new Router();

router
  /* Used on home page on drag and drop functionality that gets a path from a hash or viceversa  */
  .get('/reverse', getReverse)

  /* Used on icon page for ISR to create all icon pages statically */
  .get('/paths', getPaths)

  /* Used on icon page on ISR */
  .get('/icon/:hash', getIconByHash)

  /* Used on icon page to get tags from that icon */
  .get('/icon/:hash/tags', getTags)
  /* Used on icon page to get similar icons based on a certain tag */
  .get('/icon/:hash/:tagId/similar', getSimilarIcons)

  /* Used on icon page to get icon types */
  .get('/icon/:iconName/:packName/types', getIconTypes)

  /* Used on not found page to get icon types */
  .get('/not-found/:hash', getNotFoundIconRelatedIcons)
  /* Used on icon page to get icon types */
  .get('/icon/:hash/:packName/:hashNumber/similar', getPackRelatedIcons)

  /* Used on icon page on developer panel to get all snippets per library */
  .get('/icon/:hash/snippets', getIconSnippets)
  /* Used on the icon page to get all the library metadata  */
  .get('/icon/library/:iconLibrary', getIconLibrary)

  /* Used on gallery page to get all the initial icons */
  .get('/icons/gallery', getIconsGallery)
  /* Used on gallery page to get all the icons by icon name and icon library */
  .get('/icons/find/:iconLibrary/:iconName?', getIconsByIconNameAndIconLibrary)

  /* Used on supported libraries page to get all the  */
  .get('/icons/all/libraries', getIconLibraries)

  /* Used on home page for stats */
  .get('/stats', getStats)

  /* Used on contact page or pricing modal */
  .post('/contact', postContact);


export { router };
