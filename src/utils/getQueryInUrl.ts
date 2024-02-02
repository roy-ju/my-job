export function getQueryInUrl(query: string) {
  if (typeof window !== 'undefined') {
    const searchParams = new URLSearchParams(window.location.search);

    return searchParams.get(query);
  }
}
