import { useRouter } from "next/router";

export function useGenerateTabUrl() {
  const { query } = useRouter();

  function generateTabUrl(iconType: string) {
    const { packName, iconName } = query;

    return {
      pathname: "/[packName]/[iconType]/[iconName]",
      query: { iconType, packName: packName as string, iconName: iconName as string },
    };
  }

  return { generateTabUrl };
}
