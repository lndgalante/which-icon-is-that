// types
type Methods = "GET" | "PUT" | "POST" | "PATCH" | "DELETE";

// constants
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// helpers
const fecher = (url: string, method: Methods = "GET") => fetch(url, { method }).then((response) => response.json());

const endpoints = {
  paths: () => `${API_URL}/paths`,
  icon: (hash: string) => `${API_URL}/icon/${hash}`,
  iconLibrary: (libraryName: string) => `${API_URL}/icon/libraries/${libraryName}`,
  iconTags: (hash: string) => `${API_URL}/icon/${hash}/tags`,
  iconFound: (hash: string) => `${API_URL}/icon/${hash}/found`,
  iconSnippets: (hash: string) => `${API_URL}/icon/${hash}/snippets`,
  pathReverse: (path: string) => `${API_URL}/reverse/?path=${path}`,
  hashReverse: (hash: string) => `${API_URL}/reverse/?hash=${hash}`,
  similarIcons: (hash: string, tagId: string) => `${API_URL}/icon/${hash}/${tagId}/similar`,
};

export const api = {
  getPaths: () => fecher(endpoints.paths()),
  getIcon: (hash: string) => fecher(endpoints.icon(hash)),
  getIconLibrary: (libraryName: string) => fecher(endpoints.iconLibrary(libraryName)),
  getIconTags: (hash: string) => fecher(endpoints.iconTags(hash)),
  getIconFoundTimes: (hash: string) => fecher(endpoints.iconFound(hash)),
  getIconSnippets: (hash: string) => fecher(endpoints.iconSnippets(hash)),
  getHashFromPath: (path: string) => fecher(endpoints.pathReverse(path)),
  getPathFromHash: (hash: string) => fecher(endpoints.hashReverse(hash)),
  putIconIncrement: (hash: string) => fecher(endpoints.icon(hash), "PUT"),
  getSimilarIcons: (hash: string, tagId: string) => fecher(endpoints.similarIcons(hash, tagId)),
};
