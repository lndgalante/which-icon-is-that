import { Context } from 'https://deno.land/x/oak/mod.ts';

// db
import { contactTable } from '../db/contact.ts';

export const postContact = async ({ request, response }: Context & { response: { body: any } }) => {
  try {
    const { value } = request.body() as any;
    const { email, name, message } = await value;

    await contactTable.insertContact(email, name, message);

    response.status = 200;
    response.body = { success: true, data: { message: 'Contact saved' } };
  } catch (error) {
    console.log('Error saving contat', error);
    response.status = 500;
  }
};
