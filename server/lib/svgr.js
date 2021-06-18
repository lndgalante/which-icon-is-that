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

// styled components template
function createStyledComponent(svg, componentName, typescript = false) {
  return svgr(
    svg,
    {
      typescript,
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx', '@svgr/plugin-prettier'],
      template: typescript ? styledComponentTsTemplate : styledComponentJsTemplate,
    },
    { componentName },
  );
}

function styledComponentJsTemplate({ template }, opts, { imports, componentName, props, jsx }) {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });

  return typeScriptTpl.ast`
    import styled, { css } from 'styled-components';

    const SvgIcon = (${props}) => (props => ${jsx})({ className: props.className });

    const ${componentName} = styled(SvgIcon)([],
      ({ theme, fill, width }) => css\`
        width: \${width || theme.sizes.width};
        height: \${width || theme.sizes.width};
        fill: \${fill || theme.colors.fillColor};
      \`
    );


    export default ${componentName};
  `;
}

function styledComponentTsTemplate({ template }, opts, { imports, componentName, props, jsx }) {
  const typeScriptTpl = template.smart({ plugins: ['typescript'] });

  return typeScriptTpl.ast`
    import styled, { css } from 'styled-components';

    const SvgIcon = (${props}: React.SVGProps<SVGSVGElement>) => (props => ${jsx})({className: props.className});

    const ${componentName} = styled(SvgIcon)([],
      ({ theme, fill, width }) => css\`
        width: \${width || theme.sizes.width};
        height: \${width || theme.sizes.width};
        fill: \${fill || theme.colors.fillColor};
      \`
    );


    export default ${componentName};
  `;
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

  const styledComponentJs = await createStyledComponent(svg, `Styled${componentName}`);
  const styledComponentTs = await createStyledComponent(svg, `Styled${componentName}`, true);

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
      styledComponentJs,
      styledComponentTs,
    ]),
  );
}

output();
