import getSuggestOrListings from '../utils/getSuggestOrListings';

export default function useCheckSuggestsOrListings({ tab }: { tab: number }) {
  const type = getSuggestOrListings(tab);

  return { type };
}
