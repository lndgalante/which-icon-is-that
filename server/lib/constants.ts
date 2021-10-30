export type PacksNames = keyof typeof ICONS_WEBSITE_LINKS;

export const ICONS_FONT_CDN = {
  feather: '',
  devicon: '',
  heroicons: '',
  antdesign: '',
  boxicons: 'https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css',
  bootstrap: 'https://unpkg.com/bootstrap-icons@1.5.0/font/bootstrap-icons.css',
  flatcoloricons: '',
  fontawesome: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css',
};

export const ICONS_WEBSITE_LINKS = {
  heroicons: 'https://heroicons.com',
  feather: 'https://feathericons.com',
  bootstrap: 'https://icons.getbootstrap.com',
  antdesign: 'https://ant.design',
  boxicons: 'https://boxicons.com',
  devicon: 'https://devicon.dev',
  flatcoloricons: 'https://icons8.com/icon/set/free-icons/color',
  fontawesome: 'https://fontawesome.com',
};

export const ICONS_FIGMA_LINKS = {
  devicon: '',
  heroicons: 'https://www.figma.com/community/file/958423903283802665',
  bootstrap: 'https://www.figma.com/file/YjjMzXhECL1MIb6Qlm7VJO/Bootstrap-Icons-v1.4.1',
  feather: 'https://www.figma.com/file/dyJRSFTIajik4cdkcXN8yA3K/Feather-Component-Library?node-id=0%3A1',
  antdesign: 'https://www.figma.com/community/file/831698976089873405',
  boxicons: 'https://www.figma.com/community/file/907154826824434501',
  flatcoloricons: 'https://www.figma.com/community/plugin/791103617505812222/Icons8-Free-Icons',
  fontawesome: 'https://www.figma.com/community/plugin/774202616885508874/Font-Awesome-Iconss',
};

export const ICON_LIBRARIES = {
  bootstrap: {
    license: 'MIT',
    stars: '5.6k',
    version: '1.6.1',
    iconTypes: ['Outlined', 'Solid'],
    website: 'https://icons.getbootstrap.com',
    downloadLink: 'https://github.com/twbs/icons/releases/download/v1.6.1/bootstrap-icons-1.6.1.zip',
  },
  feather: {
    license: 'MIT',
    stars: '20.8k',
    version: '4.28.0',
    iconTypes: ['Outlined'],
    website: 'https://feathericons.com',
    downloadLink: 'https://github.com/feathericons/feather/archive/refs/tags/v4.28.0.zip',
  },
  heroicons: {
    license: 'MIT',
    stars: '13.6k',
    version: '1.0.0',
    iconTypes: ['Outlined', 'Solid'],
    website: 'https://heroicons.com',
    downloadLink: 'https://github.com/tailwindlabs/heroicons/archive/refs/tags/v1.0.0.zip',
  },
  antdesign: {
    license: 'MIT',
    stars: '601',
    version: '4.0.0',
    iconTypes: ['Outlined', 'Solid'],
    website: 'https://ant.design/components/icon',
    downloadLink: 'https://github.com/ant-design/ant-design-icons/releases/tag/%40ant-design%2Ficons-svg%404.0.0',
  },
  boxicons: {
    license: 'CC 4.0',
    stars: '1.5k',
    version: '2.0.9',
    iconTypes: ['Outlined'],
    website: 'hhttps://boxicons.com',
    downloadLink: 'https://atisa.gumroad.com/l/boxicons',
  },
  devicon: {
    license: 'MIT',
    stars: '4.4k',
    version: '2.14.0',
    iconTypes: ['Logos'],
    website: 'https://devicon.dev',
    downloadLink: 'https://github.com/devicons/devicon/archive/refs/tags/v2.14.0.zip',
  },
  flatcoloricons: {
    license: 'Good Boy',
    stars: '2k',
    version: '1.0.2',
    iconTypes: ['Color'],
    website: 'https://icons8.com/icons/color',
    downloadLink: 'https://github.com/icons8/flat-color-icons/archive/refs/tags/v1.0.2.zip',
  },
  fontawesome: {
    license: 'Font Awesome',
    stars: '66.3k',
    version: '5.15.4',
    iconTypes: ['Outline', 'Solid', 'Logos'],
    website: 'https://fontawesome.com',
    downloadLink:
      'https://github.com/FortAwesome/Font-Awesome/releases/download/5.15.4/fontawesome-free-5.15.4-web.zip',
  },
};

export const ICONS_LIST = [
  { packId: 'fa', packName: 'fontawesome', owner: 'fontawesome', repo: 'font-awesome', type: 'releases' },
  { packId: 'bs', packName: 'bootstrap', owner: 'twbs', repo: 'icons', type: 'releases' },
  { packId: 'fi', packName: 'feather', owner: 'feathericons', repo: 'feather', type: 'releases' },
  { packId: 'hi', packName: 'heroicons', owner: 'tailwindlabs', repo: 'heroicons', type: 'releases' },
  { packId: 'ai', packName: 'antdesign', owner: 'ant-design', repo: 'ant-design-icons', type: 'tags' },
  { packId: 'bi', packName: 'boxicons', owner: 'atisawd', repo: 'boxicons', type: 'releases' },
  { packId: 'fc', packName: 'flatcoloricons', owner: 'icons8', repo: 'flat-color-icons', type: 'releases' },
  // TODO: complicadito integrar devicon
  // { packId: 'di', packName: 'devicon', owner: 'devicons', repo: 'devicon', type: 'releases' },
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
  fontawesome: (iconFileName: string, iconType: string) => {
    return `https://github.com/FortAwesome/Font-Awesome/blob/master/svgs/${iconType}/${iconFileName}/${iconFileName}`;
  },
};

export const ICON_PAGE_LINK = {
  devicon: () => ICONS_WEBSITE_LINKS.devicon,
  fontawesome: () => ICONS_WEBSITE_LINKS.fontawesome,
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
