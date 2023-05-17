export default function formatPhoneNumber(str: string) {
  return `${str.substring(0, 3)}-${str.substring(3, 7)}-${str.substring(7, 11)}`;
}
