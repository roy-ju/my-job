export default function replaceFirstOccurrence(currentURL: string, search: string, replacement: string): string {
  const regex = new RegExp(search);
  return currentURL.replace(regex, replacement);
}
