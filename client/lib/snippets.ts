import svgr from '@svgr/core';
import toVue from 'svg-to-vue-component';
import { capitalCase } from 'change-case';

export function prettifyMarkup(svg: string) {
  return svgr(svg, { plugins: ['@svgr/plugin-prettier'] }).then((value) => value.replace(';', ''));
}

export function createHtmlMarkup(svg: string) {
  return svgr(svg, { plugins: ['@svgr/plugin-svgo', '@svgr/plugin-prettier'] }).then((value) => value.replace(';', ''));
}

export function createReactComponent(svg: string, componentName: string) {
  return svgr(
    svg,
    { icon: true, plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'] },
    { componentName },
  );
}

export function createReactComponentName(packName: string, iconName: string) {
  return capitalCase(`${packName.replace(/-/g, ' ')} ${iconName.replace(/-/g, ' ')}`)
    .split(' ')
    .join('');
}

export async function createVueTemplate(svg: string) {
  const { component } = await toVue(svg);
  const template = await prettifyMarkup(component);

  return template;
}
