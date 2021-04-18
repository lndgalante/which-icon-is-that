import 'https://deno.land/x/dotenv/load.ts';
import { connect, Redis } from 'https://deno.land/x/redis/mod.ts';

// types
import { SvgMap } from './icons';

export async function connectToRedis() {
  const redis: Redis = await connect({
    tls: true,
    port: Deno.env.get('REDIS_PORT') as string,
    hostname: Deno.env.get('REDIS_HOSTNAME') as string,
    password: Deno.env.get('REDIS_PASSWORD') as string,
  });

  return redis;
}

export async function saveObjectToRedis(redis: Redis, set: SvgMap) {
  try {
    for (const key in set) {
      const value = set[key];
      await redis.set(key, value, { mode: 'NX' });
    }
  } catch (error) {
    console.log('Error saving SVGs into Redis', error);
  }
}
