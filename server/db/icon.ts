import client from './database.ts';

class Icon {
  selectColumnsForPaths() {
    return client.queryObject(`SELECT pack_name, icon_type, icon_name FROM icons`);
  }

  selectColumnsForSnippets(hash: string) {
    return client.queryObject(
      `SELECT svg, inner_svg, view_box, icon_parsed_name, icon_name, pack_name, pack_id FROM icons WHERE hash = $1`,
      hash,
    );
  }

  selectAllByHash(hash: string) {
    return client.queryObject(`SELECT * FROM icons WHERE hash = $1`, hash);
  }

  selectColumnsForGallery() {
    // TODO: Merge with icon_libraries in order to get the metadata
    // TODO: Get 20 of each unique pack_name
    return client.queryObject(`SELECT pack_name, icon_type, icon_name, react_icon_name FROM icons LIMIT 100`);
  }

  selectIconsByIconNameAndIconLibrary(iconName: string, iconLibrary: string) {
    if (iconName === '' && iconLibrary !== 'all') {
      return client.queryObject(
        `SELECT pack_name, icon_type, icon_name, react_icon_name FROM icons WHERE pack_name = $1`,
        iconLibrary,
      );
    }

    if (iconLibrary === 'all') {
      return client.queryObject(
        `SELECT pack_name, icon_type, icon_name, react_icon_name FROM icons WHERE icon_name ~ $1`,
        iconName,
      );
    }

    return client.queryObject(
      `SELECT pack_name, icon_type, icon_name, react_icon_name FROM icons WHERE icon_name ~ $1 AND pack_name = $2`,
      iconName,
      iconLibrary,
    );
  }

  selectAllByHashes(hashes: string[]) {
    const inQueryValues = hashes.map((_hash, index) => `$${index + 1}`).join(', ');
    return client.queryObject(`SELECT * FROM icons WHERE hash IN (${inQueryValues})`, ...hashes);
  }

  selectFoundTimesByHash(hash: string) {
    return client.queryObject(`SELECT found FROM icons WHERE hash = $1`, hash);
  }

  async updateIconFoundTimes(hash: string) {
    const transaction = client.createTransaction('tx-increment');

    await transaction.begin();
    await transaction.queryArray(`UPDATE icons SET found = found + 1 WHERE hash = $1`, hash);
    await transaction.commit();
  }
}

export const iconTable = new Icon();
