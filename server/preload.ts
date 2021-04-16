import { Redis } from 'https://deno.land/x/redis/mod.ts';

// helpers
import { createSvgsMap } from './icons.ts';
import { saveObjectToRedis } from './redis.ts';

export async function preloadData(redis: Redis) {
  try {
    const svgs = await createSvgsMap();
    await saveObjectToRedis(redis, svgs);
  } catch (error) {
    console.log('Error preloading data', error);
  }
}
