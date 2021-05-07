const API_URL = process.env.NEXT_PUBLIC_API_URL;

const get = (url: string) => fetch(url).then((response) => response.json());

const endpoints = {
  paths: () => `${API_URL}/paths`,
  icon: (hash: string) => `${API_URL}/icon/?hash=${hash}`,
  pathReverse: (path: string) => `${API_URL}/reverse/?path=${path}`,
  hashReverse: (hash: string) => `${API_URL}/reverse/?hash=${hash}`,
};

export const api = {
  getPaths: () => get(endpoints.paths()),
  getIconData: (hash: string) => get(endpoints.icon(hash)),
  getHashFromPath: (path: string) => get(endpoints.pathReverse(path)),
  getPathFromHash: (hash: string) => get(endpoints.hashReverse(hash)),
};
