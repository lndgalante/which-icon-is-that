import { PacksNames } from './constants.ts';

export type IconType = 'outline' | 'solid' | 'fill' | 'twotone' | 'logos' | 'regular';

export type Svg = {
  hash: string;
  svg: string;
  bytes: string;
  pack_id: string;
  pack_name: PacksNames;
  icon_name: string;
  icon_type: IconType;
  icon_file_name: string;
};
