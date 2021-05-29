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

export type IconMetadata = {
  svg: Svg;
  links: Links;
  snippets: Snippets;
  tags: Tag[];
  relatedIcons: Svg[];
};

export type Response<T> = {
  success: boolean;
  data?: T;
};

export type IconResponse = Response<IconMetadata>;

export type IconFoundResponse = Response<Pick<Svg, 'found'>>;
