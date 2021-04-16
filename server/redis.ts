import { config } from 'https://deno.land/x/dotenv/mod.ts';
import { connect, Redis } from 'https://deno.land/x/redis/mod.ts';

const { REDIS_HOSTNAME, REDIS_PASSWORD, REDIS_PORT } = config();

export async function connectToRedis() {
  const redis: Redis = await connect({
    hostname: REDIS_HOSTNAME,
    password: REDIS_PASSWORD,
    port: REDIS_PORT,
    tls: true,
  });

  return redis;
}

export async function saveObjectToRedis(redis: Redis, set: any) {
  try {
    for (const key in set) {
      const value = set[key];
      await redis.set(key, value, { mode: 'NX' });
    }
  } catch (error) {
    console.log('Error saving SVGs into Redis', error);
  }
}
