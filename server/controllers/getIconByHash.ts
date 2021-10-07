import { Context } from 'https://deno.land/x/oak/mod.ts';

// lib
import { Svg } from '../lib/types.ts';
import { getIconLink, getIconPackWebsite, getIconSource, getIconPackFigmaLink } from '../lib/icons.ts';

// db
import { iconTable } from '../db/icon.ts';

export const getIconByHash = async ({ params, response }: Context & { params: { hash: string } }) => {
  const { hash } = params;

  if (!hash) {
    response.status = 400;
    response.body = { success: false, message: 'No hash provided' };
    return;
  }

  try {
    const { rows, rowCount } = await iconTable.selectAllByHash(hash);

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
        react_icon_name: reactIconName,
        icon_parsed_name: parsedIconName,
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
        svg: { hash, svg, parsedIconName, iconType, bytes, packId, packName, iconName, iconFileName, reactIconName },
      },
    };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
};
