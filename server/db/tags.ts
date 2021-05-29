import client from './database.ts';

class Tags {
  selectAllTagsByHash(hash: string) {
    return client.queryObject(
      `SELECT * FROM tags JOIN tags_icons ON tags.id = tags_icons.tag_id WHERE hash = $1`,
      hash,
    );
  }

  selectAllIconsByTagId(tagId: string) {
    return client.queryObject(
      `SELECT * FROM tags JOIN tags_icons ON tags.id = tags_icons.tag_id WHERE tag_id = $1`,
      tagId,
    );
  }
}

export const tagsTable = new Tags();
