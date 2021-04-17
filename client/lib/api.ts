const API_URL = process.env.NEXT_PUBLIC_API_URL;

const endpoints = {
  icon: `${API_URL}/icon`,
};

export const api = {
  getIconData: (hash: string) =>
    fetch(endpoints.icon, { method: 'POST', body: JSON.stringify({ hash }) }).then((response) => response.json()),
};
