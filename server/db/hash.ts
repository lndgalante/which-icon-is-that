import client from './database.ts';

class Hash {
  selectHashByPath(path: string) {
    return client.queryObject(`SELECT hash FROM paths WHERE path = $1`, path);
  }

  selectPathByHash(hash: string) {
    return client.queryObject(`SELECT path FROM paths WHERE hash = $1`, hash);
  }
}

export const hashTable = new Hash();
