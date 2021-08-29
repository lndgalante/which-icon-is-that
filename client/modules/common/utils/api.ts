import wretch from "wretch";

import { IconResponse } from "@modules/common/utils/types";

// constants
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const fetch = wretch().url(API_URL);

const endpoints = {
  paths: () => `/paths`,
  contact: () => `/contact`,
  icon: (hash: string) => `/icon/${hash}`,
  iconLibrary: (libraryName: string) => `/icon/libraries/${libraryName}`,
  iconTags: (hash: string) => `/icon/${hash}/tags`,
  iconFound: (hash: string) => `/icon/${hash}/found`,
  iconSnippets: (hash: string) => `/icon/${hash}/snippets`,
  pathReverse: (path: string) => `/reverse/?path=${path}`,
  hashReverse: (hash: string) => `/reverse/?hash=${hash}`,
  similarIcons: (hash: string, tagId: string) => `/icon/${hash}/${tagId}/similar`,
};

export const api = {
  getPaths: () => fetch.url(endpoints.paths()).get().json(),
  getIcon: (hash: string) => fetch.url(endpoints.icon(hash)).get().json<IconResponse>(),
  getIconLibrary: (libraryName: string) => fetch.url(endpoints.iconLibrary(libraryName)).get().json<IconResponse>(),
  getIconTags: (hash: string) => fetch.url(endpoints.iconTags(hash)).get().json(),
  getIconFoundTimes: (hash: string) => fetch.url(endpoints.iconFound(hash)).get().json(),
  getIconSnippets: (hash: string) => fetch.url(endpoints.iconSnippets(hash)).get().json(),
  getHashFromPath: (path: string) => fetch.url(endpoints.pathReverse(path)).get().json(),
  getPathFromHash: (hash: string) => fetch.url(endpoints.hashReverse(hash)).get().json(),
  getSimilarIcons: (hash: string, tagId: string) => fetch.url(endpoints.similarIcons(hash, tagId)).get().json(),
  putIconIncrement: (hash: string) => fetch.url(endpoints.icon(hash)).put(),
  postContact: (email: string, name?: string, message?: string) =>
    fetch.url(endpoints.contact()).post({ email, name, message }),
};
