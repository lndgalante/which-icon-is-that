type Svg = {
  svg: string;
  hash: string;
  bytes: string;
  packId: string;
  packName: string;
  iconName: string;
  iconType: string;
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
