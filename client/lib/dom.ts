export function getInnerHTMLFromSvgText(svg: string) {
  const document = new DOMParser().parseFromString(svg, 'text/html')!;
  return document.body.children[0].innerHTML;
}
