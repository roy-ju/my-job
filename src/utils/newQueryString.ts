// export default function toQueryString(params: Record<string, any>): string {
//   return Object.entries(params)
//     .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
//     .join('&');
// }

export default function toQueryString(params: Record<string, any>): string {
  const uniqueParams: Record<string, any> = {};
  Object.entries(params).forEach(([key, value]) => {
    uniqueParams[key] = value;
  });

  return Object.entries(uniqueParams)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}
