export function getInnerHTMLFromSvgText(svg: string) {
  const document = new DOMParser().parseFromString(svg, 'text/html')!;
  return document?.querySelector('svg')?.innerHTML ?? '';
}
