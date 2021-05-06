type Svg = {
  svg: string;
  hash: string;
  type: string;
  bytes: string;
  packId: string;
  packName: string;
  iconName: string;
  iconFileName: string;
};

type Links = {
  icon: string;
  pack: string;
  source: string;
};

type IconMetadata = {
  svg: Svg;
  links: Links;
};

export type FoundIcon = {
  success: boolean;
  data?: IconMetadata;
};

export type Hash = {
  hash: string;
};
