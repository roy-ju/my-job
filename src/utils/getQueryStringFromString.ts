export default function getQueryStringFromString(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString);

  const result: Record<string, string> = {};

  params.forEach((value, key) => {
    result[key] = value;
  });

  return result;
}
