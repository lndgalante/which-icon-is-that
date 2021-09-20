import { Context } from 'https://deno.land/x/oak/mod.ts';
import { ld } from 'https://deno.land/x/deno_lodash/mod.ts';

// db
import { iconTable } from '../db/icon.ts';

export const getIconNamesByIconName = async ({ params, response }: Context & { params: { iconName: string } }) => {
  const { iconName } = params;
  console.log('\n ~ getIconByiconName ~ iconName', iconName);

  if (!iconName) {
    response.status = 400;
    response.body = { success: false, message: 'No iconName provided' };
    return;
  }

  try {
    const { rows, rowCount } = await iconTable.selectIconNamesByIconName(iconName);

    if (rowCount === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No icon found' };
      return;
    }

    response.status = 200;
    response.body = {
      success: true,
      data: {
        svgs: ld.uniqBy(rows, 'icon_parsed_name').map(({ hash, icon_name, icon_parsed_name }) => ({
          hash,
          value: icon_name,
          label: icon_parsed_name,
        })),
      },
    };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
};
