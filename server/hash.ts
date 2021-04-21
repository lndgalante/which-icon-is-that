import { Md5 } from 'https://deno.land/std/hash/md5.ts';

export function createHash(value: string): string {
  const parsedValue = value.replace(/\s|\n/g, '');
  return new Md5().update(parsedValue).toString();
}
