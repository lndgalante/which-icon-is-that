import client from './database.ts';

class Contact {
  async insertContact(email: string, name?: string, message?: string) {
    const transaction = client.createTransaction('tx-contact');

    await transaction.begin();

    await transaction.queryArray(
      `INSERT INTO contacts (email, name, message) VALUES ($1, $2, $3)`,
      email,
      name ?? '',
      message ?? '',
    );

    await transaction.commit();
  }
}

export const contactTable = new Contact();
