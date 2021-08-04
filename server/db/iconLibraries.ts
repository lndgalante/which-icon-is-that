import client from './database.ts';

class IconLibraries {
  selectIconLibraryByName(name: string) {
    return client.queryObject(`SELECT * FROM icon_libraries WHERE name = $1`, name);
  }
}

export const iconLibrariesTable = new IconLibraries();
