import client from './database.ts';

class IconLibraries {
  selectIconLibraryByName(name: string) {
    return client.queryObject(`SELECT * FROM icon_libraries WHERE name = $1`, name);
  }

  selectColumnsForStats() {
    return client.queryObject(`SELECT total_icons, icon_types FROM icon_libraries`);
  }

  selectAllIconLibraries() {
    return client.queryObject(`SELECT * FROM icon_libraries`);
  }
}

export const iconLibrariesTable = new IconLibraries();
