import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';

export function getInnerHTMLFromSvgText(svg: string) {
  const document = new DOMParser().parseFromString(svg.toLowerCase(), 'text/html');
  const svgElement = document?.querySelector('svg');

  const viewBox = svgElement?.attributes?.viewBox ?? '';
  const innerSvg = svgElement?.innerHTML?.toLowerCase().trim() ?? '';

  return { innerSvg, viewBox };
}
