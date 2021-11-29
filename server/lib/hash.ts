import { Md5 } from 'https://deno.land/std/hash/md5.ts';

export function createHash(value: string): string {
  const parsedValue = value.replace(/\s|\n/g, '');
  return new Md5().update(parsedValue).toString();
}

export function createHashNumber(hash: string): string {
  return hash
    .split('')
    .map((character) => character.charCodeAt(0))
    .reduce((accumulator, characterCode) => accumulator + characterCode, 0)
    .toString();
}
