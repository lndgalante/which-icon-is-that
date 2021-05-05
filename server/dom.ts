import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';

export function getInnerHTMLFromSvgText(svg: string) {
  if (!svg) return '';

  const document = new DOMParser().parseFromString(svg, 'text/html');
  return document ? document.body.children[0].innerHTML : '';
}
