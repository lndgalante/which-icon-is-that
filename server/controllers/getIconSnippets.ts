import { Context } from 'https://deno.land/x/oak/mod.ts';

// lib
import { Svg } from '../lib/types.ts';
import { generateIconSnippets } from '../lib/snippets.ts';

// db
import { iconTable } from '../db/icon.ts';

export const getIconSnippets = async ({ params, response }: Context & { params: { hash: string } }) => {
  try {
    const { hash } = params;

    if (!hash) {
      response.status = 400;
      response.body = { success: false, message: 'No hash provided' };
      return;
    }

    const { rows, rowCount } = await iconTable.selectColumnsForSnippets(hash);

    if (rowCount === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No icon found' };
      return;
    }

    const [svgRow] = rows as [Svg];
    const {
      svg,
      pack_id: packId,
      view_box: viewBox,
      inner_svg: innerSvg,
      pack_name: packName,
      icon_name: iconName,
    } = svgRow;

    const snippets = await generateIconSnippets(svg, innerSvg, viewBox, iconName, packName, packId);

    response.status = 200;
    response.body = { success: true, data: { snippets } };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
};
