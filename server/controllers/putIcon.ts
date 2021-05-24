import { Context } from 'https://deno.land/x/oak/mod.ts';

// db
import { iconTable } from '../db/icon.ts';

export const putIcon = async ({ params, response }: Context & { params: { hash: string } }) => {
  try {
    const { hash } = params;

    await iconTable.updateIconFoundTimes(hash);

    response.status = 200;
    response.body = { success: true, data: { message: 'Icon updated' } };
  } catch (error) {
    console.log('Error incrementing found times', error);
    response.status = 500;
  }
};
