// types
type Methods = 'GET' | 'PUT' | 'POST' | 'PATCH' | 'DELETE';

// constants
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// helpers
const fecher = (url: string, method: Methods = 'GET') => fetch(url, { method }).then((response) => response.json());

const endpoints = {
  paths: () => `${API_URL}/paths`,
  icon: (hash: string) => `${API_URL}/icon/${hash}`,
  iconFound: (hash: string) => `${API_URL}/icon/${hash}/found`,
  pathReverse: (path: string) => `${API_URL}/reverse/?path=${path}`,
  hashReverse: (hash: string) => `${API_URL}/reverse/?hash=${hash}`,
};

export const api = {
  getPaths: () => fecher(endpoints.paths()),
  getIconData: (hash: string) => fecher(endpoints.icon(hash)),
  getIconFoundData: (hash: string) => fecher(endpoints.iconFound(hash)),
  getHashFromPath: (path: string) => fecher(endpoints.pathReverse(path)),
  getPathFromHash: (hash: string) => fecher(endpoints.hashReverse(hash)),
  putIconIncrement: (hash: string) => fecher(endpoints.icon(hash), 'PUT'),
};
