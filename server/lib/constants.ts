export type PacksNames = keyof typeof ICONS_WEBSITE_LINKS;

export const ICONS_FONT_CDN = {
  feather: '',
  devicon: '',
  heroicons: '',
  boxicons: 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css',
  bootstrap: 'https://unpkg.com/bootstrap-icons@1.5.0/font/bootstrap-icons.css',
};

export const ICONS_WEBSITE_LINKS = {
  heroicons: 'https://heroicons.com',
  feather: 'https://feathericons.com',
  bootstrap: 'https://icons.getbootstrap.com',
  antdesign: 'https://ant.design',
  boxicons: 'https://boxicons.com',
  devicon: 'https://devicon.dev',
  flatcoloricons: 'https://icons8.com/icon/set/free-icons/color',
};

export const ICONS_FIGMA_LINKS = {
  devicon: '',
  heroicons: 'https://www.figma.com/community/file/958423903283802665',
  bootstrap: 'https://www.figma.com/file/YjjMzXhECL1MIb6Qlm7VJO/Bootstrap-Icons-v1.4.1',
  feather: 'https://www.figma.com/file/dyJRSFTIajik4cdkcXN8yA3K/Feather-Component-Library?node-id=0%3A1',
  antdesign: 'https://www.figma.com/community/file/831698976089873405',
  boxicons: 'https://www.figma.com/community/file/907154826824434501',
  flatcoloricons: 'https://www.figma.com/community/plugin/791103617505812222/Icons8-Free-Icons',
};

export const ICON_LIBRARIES = [
  {
    name: 'feather',
    totalIcons: 286,
    license: 'MIT',
    stars: '20.4k',
    version: '4.28.0',
    iconTypes: ['Regular'],
    website: 'https://feathericons.com',
    downloadLink: 'https://github.com/feathericons/feather/archive/refs/tags/v4.28.0.zip',
  },
  {
    name: 'heroicons',
    totalIcons: 230,
    license: 'MIT',
    stars: '13k',
    version: '1.0.0',
    iconTypes: ['Outline', 'Solid'],
    website: 'https://heroicons.com',
    downloadLink: 'https://github.com/tailwindlabs/heroicons/archive/refs/tags/v1.0.0.zip',
  },
];

export const ICONS_LIST = [
  // { packId: 'bs', packName: 'bootstrap', owner: 'twbs', repo: 'icons', type: 'releases' },
  { packId: 'fi', packName: 'feather', owner: 'feathericons', repo: 'feather', type: 'releases' },
  { packId: 'hi', packName: 'heroicons', owner: 'tailwindlabs', repo: 'heroicons', type: 'releases' },
  // { packId: 'ai', packName: 'antdesign', owner: 'ant-design', repo: 'ant-design-icons', type: 'tags' },
  // { packId: 'bi', packName: 'boxicons', owner: 'atisawd', repo: 'boxicons', type: 'releases' },
  // { packId: 'di', packName: 'devicon', owner: 'devicons', repo: 'devicon', type: 'releases' },
  // { packId: 'fc', packName: 'flatcoloricons', owner: 'icons8', repo: 'flat-color-icons', type: 'releases' },
];

export const ICONS_SOURCE_LINKS = {
  bootstrap: (iconFileName: string) => {
    return `https://github.com/twbs/icons/blob/main/icons/${iconFileName}`;
  },
  feather: (iconFileName: string) => {
    return `https://github.com/feathericons/feather/blob/master/icons/${iconFileName}`;
  },
  flatcoloricons: (iconFileName: string) => {
    return `https://github.com/icons8/flat-color-icons/blob/master/svg/${iconFileName}`;
  },
  heroicons: (iconFileName: string) => {
    return `https://github.com/tailwindlabs/heroicons/blob/master/src/outline/${iconFileName}`;
  },
  devicon: (iconFileName: string) => {
    const [folder] = iconFileName.split('-');
    return `https://github.com/devicons/devicon/blob/master/icons/${folder}/${iconFileName}`;
  },
  boxicons: (iconFileName: string, iconType: string) => {
    return `https://github.com/atiswad/boxicons/blob/master/svg/${iconType}/${iconFileName}`;
  },
  antdesign: (iconFileName: string, iconType: string) => {
    return `https://github.com/ant-design/ant-design-icons/blob/master/packages/icons-svg/svg/${iconType}/${iconFileName}`;
  },
};

export const ICON_PAGE_LINK = {
  devicon: () => ICONS_WEBSITE_LINKS.devicon,
  boxicons: () => ICONS_WEBSITE_LINKS.boxicons,
  heroicons: () => ICONS_WEBSITE_LINKS.heroicons,
  antdesign: () => `${ICONS_WEBSITE_LINKS.antdesign}/components/icon`,
  feather: (iconName: string) => `${ICONS_WEBSITE_LINKS.feather}/?query=${iconName}`,
  bootstrap: (iconName: string) => `${ICONS_WEBSITE_LINKS.bootstrap}/icons/${iconName}`,
  flatcoloricons: (iconName: string) => {
    const parsedIconName = encodeURIComponent(iconName.replace(/\_/g, ' '));
    return `${ICONS_WEBSITE_LINKS.flatcoloricons.replace('free-icons', parsedIconName)}`;
  },
};
