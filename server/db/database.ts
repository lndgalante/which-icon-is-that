import 'https://deno.land/x/dotenv/load.ts';
import { Client } from 'https://deno.land/x/postgres/mod.ts';

// lib
import { isDevelopment } from '../lib/env.ts';

function createClientDevelopmentOptions() {
  const options = {
    port: Deno.env.get('POSTGRES_PORT') as string,
    user: Deno.env.get('POSTGRES_USER') as string,
    password: Deno.env.get('POSTGRES_PASSWORD') as string,
    hostname: Deno.env.get('POSTGRES_HOSTNAME') as string,
    database: Deno.env.get('POSTGRES_DATABASE') as string,
  };

  return options;
}

function createClientProductionOptions() {
  return Deno.env.get('DATABASE_URL');
}

async function connectToPostgres() {
  const clientOptions = isDevelopment() ? createClientDevelopmentOptions() : createClientProductionOptions();
  const client = new Client(clientOptions);

  await client.connect();

  return client;

}

const client = await connectToPostgres();

export default client;
