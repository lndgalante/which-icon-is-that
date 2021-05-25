import 'https://deno.land/x/dotenv/load.ts';
import { Client } from 'https://deno.land/x/postgres/mod.ts';

// lib
import { isDevelopment } from '../lib/env.ts';

async function connectToPostgres() {
  const developmentOptions = {
    port: Deno.env.get('POSTGRES_PORT') as string,
    user: Deno.env.get('POSTGRES_USER') as string,
    password: Deno.env.get('POSTGRES_PASSWORD') as string,
    hostname: Deno.env.get('POSTGRES_HOSTNAME') as string,
    database: Deno.env.get('POSTGRES_DATABASE') as string,
  };

  const productionOptions = {
    hostname: Deno.env.get('DATABASE_URL') as string,
  };

  const clientOptions = isDevelopment() ? developmentOptions : productionOptions;
  const client = new Client(clientOptions);

  await client.connect();

  return client;
}

const client = await connectToPostgres();

export default client;
