export function decodeHtmlEntity(encodedString: string) {
  const domParser = new DOMParser();
  const decodedString = domParser.parseFromString(encodedString, 'text/html').documentElement.textContent;
  return decodedString;
}
