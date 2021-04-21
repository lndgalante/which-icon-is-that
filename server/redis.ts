import 'https://deno.land/x/dotenv/load.ts';
import { connect, Redis } from 'https://deno.land/x/redis/mod.ts';

export async function connectToRedis() {
  const redis: Redis = await connect({
    tls: true,
    port: Deno.env.get('REDIS_PORT') as string,
    hostname: Deno.env.get('REDIS_HOSTNAME') as string,
    password: Deno.env.get('REDIS_PASSWORD') as string,
  });

  return redis;
}

export function cleanRedis(redis: Redis) {
  return redis.executor.exec('FLUSHALL');
}
