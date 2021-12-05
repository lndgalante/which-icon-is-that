import { Context } from 'https://deno.land/x/oak/mod.ts';

// db
import { snippetsTable } from '../db/snippets.ts';

export const getIconSnippets = async ({ params, response }: Context & { params: { hash: string } }) => {
  try {
    const { hash } = params;

    if (!hash) {
      response.status = 400;
      response.body = { success: false, message: 'No hash provided' };
      return;
    }

    const { rows, rowCount } = await snippetsTable.selectColumnsForSnippets(hash);

    if (rowCount === 0) {
      response.status = 404;
      response.body = { success: false, message: 'No icon found' };
      return;
    }

    const [snippetRow] = rows as [any];

    response.status = 200;
    response.body = { success: true, data: { snippets: snippetRow.snippet } };
  } catch (error) {
    console.log('Server error', error);
    response.status = 500;
  }
};
