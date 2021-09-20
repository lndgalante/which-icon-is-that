import { Context } from 'https://deno.land/x/oak/mod.ts';

// db
import { iconTable } from '../db/icon.ts';

export const getIconsByIconNameAndIconLibrary = async ({
  params,
  response,
}: Context & { params: { iconName: string; iconLibrary: string } }) => {
  const { iconName, iconLibrary = '' } = params;
  console.log('\n ~ getIconsByIconNameAndIconLibrary  ~ iconName', iconName);
  console.log('\n ~ getIconsByIconNameAndIconLibrary  ~ iconLibrary', iconLibrary);

  if (!iconName) {
    response.status = 400;
    response.body = { success: false, message: 'No iconName provided' };
    return;
  }

  try {
    const { rows, rowCount } = await iconTable.selectIconsByIconNameAndIconLibrary(iconName, iconLibrary);
    console.log('\n ~ rows', rows);

    if (rowCount === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No icon found' };
      return;
    }

    response.status = 200;
    response.body = {
      success: true,
      data: {
        svgs: rows.map(({ hash, icon_name, icon_parsed_name, icon_type, react_icon_name, pack_name }) => ({
          hash,
          packName: pack_name,
          iconName: icon_name,
          iconType: icon_type,
          iconParsedName: icon_parsed_name,
          reactIconName: react_icon_name,
        })),
      },
    };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
};
