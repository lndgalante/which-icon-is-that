import postgres from 'postgres';

export async function connectToPostgres() {
  return postgres({
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    hostname: process.env.POSTGRES_HOSTNAME,
    database: process.env.POSTGRES_DATABASE,
  });
}
