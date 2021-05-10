import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';

export function getInnerHTMLFromSvgText(svg: string): string {
  const document = new DOMParser().parseFromString(svg.toLowerCase(), 'text/html');
  return document?.querySelector('svg')?.innerHTML?.toLowerCase() ?? '';
}
