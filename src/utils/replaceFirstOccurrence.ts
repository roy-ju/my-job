export default function replaceFirstOccurrence(inputString: string, search: string, replacement: string): string {
  const regex = new RegExp(search);
  return inputString.replace(regex, replacement);
}
