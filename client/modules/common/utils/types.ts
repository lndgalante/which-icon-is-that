export type Svg = {
  id: string;
  svg: string;
  hash: string;
  bytes: string;
  found: number;
  packId: string;
  packName: string;
  iconName: string;
  iconType: string;
  hashNumber: number;
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

export type IconLibrary = {
  name: string;
  license: string;
  totalIcons: number;
  version: string;
  website: string;
  downloadLink: string;
};

export type Icon = {
  svg: Svg;
  links: Links;
};

export type IconsRelated = Pick<Svg, "id" | "iconName" | "packName" | "iconType" | "reactIconName">;

export type IconTypes = {
  iconTypes: string[];
};

export type IconMetadata = {
  // tags: Tag[];
  icon: Icon;
  snippets: Snippets;
  iconTypes: string[];
  iconLibrary: IconLibrary;
  relatedIcons: IconsRelated[];
};

export type Response<T> = {
  success: boolean;
  data?: T;
};

export type IconResponse = Response<Icon>;

export type IconFoundResponse = Response<Pick<Svg, "found">>;

export type IconFound = Pick<Svg, "packName" | "iconName" | "iconType" | "reactIconName">;

export type IconsFoundResponse = Response<{ svgs: IconFound[] }>;

export type IconLibraryResponse = Response<IconLibrary>;

export type IconTypeResponse = Response<IconTypes>;
