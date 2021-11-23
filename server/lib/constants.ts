export type PacksNames = keyof typeof ICON_LIBRARIES;

export const ICON_LIBRARIES = {
  bootstrap: {
    contributors: 24,
    license: 'MIT',
    stars: '5.6k',
    version: '1.6.1',
    parsedName: 'Bootstrap',
    iconTypes: ['Outlined', 'Solid'],
    website: 'https://icons.getbootstrap.com',
    githubLink: 'https://github.com/twbs/icons',
    figmaLink: 'https://www.figma.com/file/YjjMzXhECL1MIb6Qlm7VJO/Bootstrap-Icons-v1.4.1',
    downloadLink: 'https://github.com/twbs/icons/releases/download/v1.6.1/bootstrap-icons-1.6.1.zip',
  },
  feather: {
    contributors: 35,
    license: 'MIT',
    stars: '20.8k',
    version: '4.28.0',
    iconTypes: ['Outlined'],
    parsedName: 'Feather',
    website: 'https://feathericons.com',
    githubLink: 'https://github.com/feathericons/feather',
    downloadLink: 'https://github.com/feathericons/feather/archive/refs/tags/v4.28.0.zip',
    figmaLink: 'https://www.figma.com/file/dyJRSFTIajik4cdkcXN8yA3K/Feather-Component-Library?node-id=0%3A1',
  },
  heroicons: {
    contributors: 18,
    license: 'MIT',
    stars: '13.6k',
    version: '1.0.0',
    iconTypes: ['Outlined', 'Solid'],
    website: 'https://heroicons.com',
    parsedName: 'Heroicons',
    githubLink: 'https://github.com/tailwindlabs/heroicons',
    figmaLink: 'https://www.figma.com/community/file/958423903283802665',
    downloadLink: 'https://github.com/tailwindlabs/heroicons/archive/refs/tags/v1.0.0.zip',
  },
  antdesign: {
    contributors: 31,
    license: 'MIT',
    stars: '601',
    version: '4.0.0',
    iconTypes: ['Outlined', 'Solid'],
    parsedName: 'Ant Design',
    website: 'https://ant.design/components/icon',
    githubLink: 'https://github.com/ant-design/ant-design-icons',
    downloadLink: 'https://github.com/ant-design/ant-design-icons/releases/tag/%40ant-design%2Ficons-svg%404.0.0',
    figmaLink: 'https://www.figma.com/community/file/831698976089873405',
  },
  boxicons: {
    contributors: 5,
    license: 'CC 4.0',
    stars: '1.5k',
    version: '2.0.9',
    iconTypes: ['Outlined'],
    parsedName: 'Boxicons',
    website: 'hhttps://boxicons.com',
    githubLink: 'https://github.com/atisawd/boxicons',
    downloadLink: 'https://atisa.gumroad.com/l/boxicons',
    figmaLink: 'https://www.figma.com/community/file/907154826824434501',
  },
  devicon: {
    contributors: 61,
    license: 'MIT',
    stars: '4.4k',
    version: '2.14.0',
    iconTypes: ['Logos'],
    parsedName: 'Devicon',
    website: 'https://devicon.dev',
    downloadLink: 'https://github.com/devicons/devicon/archive/refs/tags/v2.14.0.zip',
    figmaLink: '',
    githubLink: 'https://github.com/devicons/devicon',
  },
  flatcoloricons: {
    contributors: 6,
    license: 'Good Boy',
    stars: '2k',
    version: '1.0.2',
    iconTypes: ['Color'],
    parsedName: 'Icons8',
    website: 'https://icons8.com/icons/color',
    githubLink: 'https://github.com/icons8/flat-color-icons',
    downloadLink: 'https://github.com/icons8/flat-color-icons/archive/refs/tags/v1.0.2.zip',
    figmaLink: 'https://www.figma.com/community/plugin/791103617505812222/Icons8-Free-Icons',
  },
  fontawesome: {
    contributors: 94,
    license: 'Font Awesome',
    stars: '66.3k',
    version: '5.15.4',
    parsedName: 'Font Awesome',
    iconTypes: ['Outlined', 'Solid', 'Logos'],
    website: 'https://fontawesome.com',
    githubLink: 'https://github.com/FortAwesome/Font-Awesome',
    downloadLink:
      'https://github.com/FortAwesome/Font-Awesome/releases/download/5.15.4/fontawesome-free-5.15.4-web.zip',
    figmaLink: 'https://www.figma.com/community/plugin/774202616885508874/Font-Awesome-Iconss',
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
  devicon: () => ICON_LIBRARIES.devicon.website,
  fontawesome: () => ICON_LIBRARIES.fontawesome.website,
  boxicons: () => ICON_LIBRARIES.boxicons.website,
  heroicons: () => ICON_LIBRARIES.heroicons.website,
  antdesign: () => `${ICON_LIBRARIES.antdesign.website}/components/icon`,
  feather: (iconName: string) => `${ICON_LIBRARIES.feather.website}/?query=${iconName}`,
  bootstrap: (iconName: string) => `${ICON_LIBRARIES.bootstrap.website}/icons/${iconName}`,
  flatcoloricons: (iconName: string) => {
    const parsedIconName = encodeURIComponent(iconName.replace(/\_/g, ' '));
    return `${ICON_LIBRARIES.flatcoloricons.website.replace('free-icons', parsedIconName)}`;
  },
};
