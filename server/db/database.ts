import 'https://deno.land/x/dotenv/load.ts';
import { Client } from 'https://deno.land/x/postgres/mod.ts';
import { urlParse } from 'https://deno.land/x/url_parse/mod.ts';

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
  const dbParsedUrl = urlParse(Deno.env.get('HEROKU_POSTGRESQL_CRIMSON_URL'));
  const options = {
    port: dbParsedUrl.port,
    user: dbParsedUrl.username,
    password: dbParsedUrl.password,
    hostname: dbParsedUrl.hostname,
    database: dbParsedUrl.pathname.slice(1),
  };

  return options;
}

async function connectToPostgres() {
  const clientOptions = isDevelopment() ? createClientDevelopmentOptions() : createClientProductionOptions();
  const client = new Client(clientOptions);

  await client.connect();

  return client;
}

const client = await connectToPostgres();

export default client;
