type Svg = {
  svg: string;
  bytes: string;
  packName: string;
  packId: string;
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
