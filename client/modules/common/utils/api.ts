import wretch from "wretch";

import {
  IconResponse,
  IconsFoundResponse,
  IconFoundResponse,
  IconLibraryResponse,
  IconTypeResponse,
} from "@modules/common/utils/types";

// constants
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const fetch = wretch().url(API_URL);

// TODO: split endpoints by module
const endpoints = {
  paths: () => `/paths`,
  contact: () => `/contact`,
  gallery: () => `/icons/gallery`,
  iconFindIconsByIconNameAndIconLibrary: (iconLibrary: string, iconName: string) =>
    `/icons/find/${iconLibrary}/${iconName}`,
  icon: (hash: string) => `/icon/${hash}`,
  iconTypes: (iconName: string, packName: string) => `/icon/${iconName}/${packName}/types`,
  iconLibrary: (libraryName: string) => `/icon/library/${libraryName}`,
  iconTags: (hash: string) => `/icon/${hash}/tags`,
  iconFound: (hash: string) => `/icon/${hash}/found`,
  iconSnippets: (hash: string) => `/icon/${hash}/snippets`,
  pathReverse: (path: string) => `/reverse/?path=${path}`,
  hashReverse: (hash: string) => `/reverse/?hash=${hash}`,
  similarIcons: (iconName: string, packName: string, hashNumber) =>
    `/icon/${iconName}/${packName}/${hashNumber}/similar`,
};

// TODO: Split api by module
export const api = {
  getGalleryIcons: () => fetch.url(endpoints.gallery()).get().json(),
  getPaths: () => fetch.url(endpoints.paths()).get().json(),
  getIconTypes: (iconName: string, packName: string) =>
    fetch.url(endpoints.iconTypes(iconName, packName)).get().json<IconTypeResponse>(),
  getIconsFindByIconNameAndIconLibrary: (iconName: string, iconLibrary: string) =>
    fetch.url(endpoints.iconFindIconsByIconNameAndIconLibrary(iconName, iconLibrary)).get().json<IconsFoundResponse>(),
  getIcon: (hash: string) => fetch.url(endpoints.icon(hash)).get().json<IconResponse>(),
  getIconLibrary: (libraryName: string) =>
    fetch.url(endpoints.iconLibrary(libraryName)).get().json<IconLibraryResponse>(),
  getIconTags: (hash: string) => fetch.url(endpoints.iconTags(hash)).get().json(),
  getIconFoundTimes: (hash: string) => fetch.url(endpoints.iconFound(hash)).get().json<IconFoundResponse>(),
  getIconSnippets: (hash: string) => fetch.url(endpoints.iconSnippets(hash)).get().json(),
  getHashFromPath: (path: string) => fetch.url(endpoints.pathReverse(path)).get().json(),
  getPathFromHash: (hash: string) => fetch.url(endpoints.hashReverse(hash)).get().json(),
  getSimilarIcons: (iconName: string, packName: string, hashNumber: number) =>
    fetch.url(endpoints.similarIcons(iconName, packName, hashNumber)).get().json(),
  putIconIncrement: (hash: string) => fetch.url(endpoints.icon(hash)).put(),
  postContact: (email: string, name?: string, message?: string) =>
    fetch.url(endpoints.contact()).post({ email, name, message }),
};
