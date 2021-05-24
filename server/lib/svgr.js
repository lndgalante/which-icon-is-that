const { default: svgr } = require('@svgr/core');
const toVue = require('svg-to-vue-component');

// utils
const semicolonRemover = (value) => value.replace(';', '');

// prettify
function prettifyMarkup(svg) {
  return svgr(svg, { plugins: ['@svgr/plugin-prettier'] }).then(semicolonRemover);
}

// html
function createHtmlMarkup(svg) {
  return svgr(svg, { plugins: ['@svgr/plugin-svgo', '@svgr/plugin-prettier'] }).then(semicolonRemover);
}

// react component
function createReactComponent(svg, componentName, typescript = false) {
  return svgr(
    svg,
    { typescript, plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'] },
    { componentName },
  );
}

// react native component
function createReactNativeComponent(svg, componentName, typescript = false) {
  return svgr(
    svg,
    { native: true, typescript, plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'] },
    { componentName },
  );
}

// vue template
async function createVueTemplate(svg) {
  const { component } = await toVue(svg);
  const template = await prettifyMarkup(component);

  return template;
}

async function output() {
  const [, , svg, componentName] = process.argv;

  const html = await createHtmlMarkup(svg);
  const vueTemplate = await createVueTemplate(svg);

  const reactComponentJs = await createReactComponent(svg, componentName);
  const reactComponentTs = await createReactComponent(svg, componentName, true);

  const reactNativeComponentJs = await createReactNativeComponent(svg, componentName);
  const reactNativeComponentTs = await createReactNativeComponent(svg, componentName, true);

  console.log(
    JSON.stringify([
      html,
      vueTemplate,
      reactComponentJs,
      reactComponentTs,
      reactNativeComponentJs,
      reactNativeComponentTs,
    ]),
  );
}

output();
