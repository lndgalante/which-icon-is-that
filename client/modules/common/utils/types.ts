export type Svg = {
  svg: string;
  hash: string;
  bytes: string;
  found: number;
  packId: string;
  packName: string;
  iconName: string;
  iconType: string;
  iconFileName: string;
  reactIconName: string;
  parsedIconName: string;
};

export type Links = {
  icon: string;
  pack: string;
  source: string;
  figma: string;
};

export type Snippets = {
  vue: string;
  html: string;
  react: string;
  reactIconsImport: string;
};

export type Tag = {
  name: string;
  tag_id: string;
};

type IconLibrary = {
  license: string;
  totalIcons: number;
  version: string;
  website: string;
  downloadLink: string;
};

export type IconMetadata = {
  iconLibrary: IconLibrary;
  icon: { svg: Svg; links: Links };
  tags: Tag[];
  snippets: Snippets;
  relatedIcons: Svg[];
  iconTypes: string[];
};

export type Response<T> = {
  success: boolean;
  data?: T;
};

export type IconResponse = Response<IconMetadata>;

export type IconFoundResponse = Response<Pick<Svg, "found">>;

export type IconFound = Pick<Svg, "packName" | "iconName" | "iconType" | "reactIconName">;

export type IconsFoundResponse = Response<{ svgs: IconFound[] }>;
