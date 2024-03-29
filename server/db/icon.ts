import client from './database.ts';

class Icon {
  selectColumnsForPaths() {
    return client.queryObject(`SELECT pack_name, icon_type, icon_name FROM icons`);
  }

  selectColumnsForTypes(iconName: string, packName: string) {
    return client.queryObject(
      `SELECT icon_type FROM icons WHERE icon_name = $1 AND pack_name = $2`,
      iconName,
      packName,
    );
  }

  selectColumnsForSimilarIcons(hash: string, packName: string, hashNumber: string) {
    return client.queryObject(
      `SELECT icon_name, icon_type, react_icon_name FROM icons WHERE hash <> $1 AND pack_name = $2 AND hash_number >= ($3 - 10) AND hash_number <= ($3 + 10) LIMIT 20`,
      hash,
      packName,
      hashNumber,
    );
  }

  selectColumnsForSimilarIconsNotFound(hash: string, hashNumber: string) {
    return client.queryObject(
      `SELECT icon_name, icon_type, react_icon_name, pack_name FROM icons WHERE hash <> $1 AND hash_number >= ($2 - 10) AND hash_number <= ($2 + 10) LIMIT 4`,
      hash,
      hashNumber,
    );
  }

  selectAllByHash(hash: string) {
    return client.queryObject(`SELECT * FROM icons WHERE hash = $1`, hash);
  }

  selectColumnsForGallery() {
    return client.queryObject(`
      SELECT
            *
          FROM (
            SELECT
              ROW_NUMBER() OVER (PARTITION BY pack_id ORDER BY icon_name) AS r,
              t.*
            FROM
              icons t) icons
          WHERE
            icons.r <= 20
    `);
  }

  selectIconsByIconNameAndIconLibrary(iconName: string, iconLibrary: string) {
    const parsedIconName = iconName.toLowerCase().replace(/\s+/g, '');

    if (parsedIconName === '' && iconLibrary !== 'all') {
      return client.queryObject(
        `SELECT pack_name, icon_type, icon_name, react_icon_name FROM icons WHERE pack_name = $1`,
        iconLibrary,
      );
    }


    if (iconLibrary === 'all') {
      return client.queryObject(
        `SELECT pack_name, icon_type, icon_name, react_icon_name FROM icons WHERE icon_name ~ $1`,
        parsedIconName,
      );
    }

    return client.queryObject(
      `SELECT pack_name, icon_type, icon_name, react_icon_name FROM icons WHERE icon_name ~ $1 AND pack_name = $2`,
      parsedIconName,
      iconLibrary,
    );
  }

  selectAllByHashes(hashes: string[]) {
    const inQueryValues = hashes.map((_hash, index) => `$${index + 1}`).join(', ');
    return client.queryObject(`SELECT * FROM icons WHERE hash IN (${inQueryValues})`, ...hashes);
  }
}

export const iconTable = new Icon();
