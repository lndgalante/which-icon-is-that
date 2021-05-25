import { PacksNames } from './constants.ts';

const DEVICON_OPTIONAL_WORDMARK = 'wordmark';

type Antdesign = 'fill' | 'outline' | 'twotone';

type BootstrapFeather = 'regular';

type Boxicons = 'logos' | 'regular' | 'solid';

type Devicons =
  | 'line'
  | 'plain'
  | 'original'
  | `line-${typeof DEVICON_OPTIONAL_WORDMARK}`
  | `plain-${typeof DEVICON_OPTIONAL_WORDMARK}`
  | `original-${typeof DEVICON_OPTIONAL_WORDMARK}`;

type Heroicons = 'outline' | 'solid';

export type IconType = Antdesign | BootstrapFeather | Boxicons | Devicons | Heroicons;

export type Svg = {
  hash: string;
  svg: string;
  bytes: string;
  found: number;
  pack_id: string;
  pack_name: PacksNames;
  icon_name: string;
  icon_type: IconType;
  icon_file_name: string;
};