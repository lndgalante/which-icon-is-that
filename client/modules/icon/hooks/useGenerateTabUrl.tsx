import { useRouter } from "next/router";

export function useGenerateTabUrl() {
  const { query } = useRouter();

  function generateTabUrl(iconType: string) {
    const { packName, iconName } = query;

    return {
      pathname: "/[packName]/[iconType]/[iconName]",
      query: { packName, iconType, iconName },
    };
  }

  return { generateTabUrl };
}
