import { createRequire } from 'https://deno.land/std@0.109.0/node/module.ts';

// commonjs require
const require = createRequire(import.meta.url);

const Hi = require('react-icons/hi');
const Fi = require('react-icons/fi');
const Bs = require('react-icons/bs');
const Ai = require('react-icons/ai');
const Bi = require('react-icons/bi');
const Di = require('react-icons/di');
const Fc = require('react-icons/fc');


// react-icons
 const heroicons = Object.keys(Hi);
 const feather = Object.keys(Fi);
 const bootstrap = Object.keys(Bs);
 const antdesign = Object.keys(Ai);
 const boxicons = Object.keys(Bi);
 const devicon = Object.keys(Di);
 const flatcoloricons = Object.keys(Fc);

function parseReactIconsNames(icons: string[]) {
  return icons.map((icon) => {
    const parsed = icon.replace(/^.{2}/i, '').toLowerCase();

    return { original: icon, parsed };
  });
}

export const reactIconsPacks = {
  heroicons,
  feather,
  bootstrap,
  antdesign,
  boxicons,
  devicon,
  flatcoloricons
}

export const reactIconsParsedPacks = {
  heroicons: parseReactIconsNames(heroicons),
  feather: parseReactIconsNames(feather),
  bootstrap: parseReactIconsNames(bootstrap),
  antdesign: parseReactIconsNames(antdesign),
  boxicons: parseReactIconsNames(boxicons),
  devicon: parseReactIconsNames(devicon),
  flatcoloricons: parseReactIconsNames(flatcoloricons),
};
