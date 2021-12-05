import client from './database.ts';

class Snippets {
  selectColumnsForSnippets(hash: string) {
    return client.queryObject(`SELECT snippet FROM snippets WHERE hash = $1`, hash);
  }
}

export const snippetsTable = new Snippets();
