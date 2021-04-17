type Svg = {
  bytes: string;
  fileName: string;
  name: string;
  pack: string;
  svg: string;
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
