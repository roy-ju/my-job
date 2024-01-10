export default function addQueryStringToUrl(url: string, queryString: string): string {
  const hasQueryString = url.includes('?');
  return hasQueryString ? `${url}&${queryString}` : `${url}?${queryString}`;
}
