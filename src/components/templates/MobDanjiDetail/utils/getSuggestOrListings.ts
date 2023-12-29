export default function getSuggestOrListings(value: number) {
  return value === 1 ? 'suggest' : 'listing';
}
