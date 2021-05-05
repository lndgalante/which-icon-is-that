const API_URL = process.env.NEXT_PUBLIC_API_URL;

const endpoints = {
  icon: (hash) => `${API_URL}/icon/?hash=${hash}`,
};

export const api = {
  getIconData: (hash: string) => fetch(endpoints.icon(hash)).then((response) => response.json()),
};
