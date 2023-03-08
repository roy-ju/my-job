import { searchKeyword } from '@/lib/kakao';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export interface KakaoAddressAutocompleteResponseItem {
  id: string;
  addressName: string;
  categoryName: string;
  placeName: string;
  roadAddressName: string;
  lat: number;
  lng: number;
}

export default function useKakaoAddressAutocomplete(query: string) {
  const [results, setResults] = useState<
    KakaoAddressAutocompleteResponseItem[]
  >([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useCallback(
    _.debounce(async (q: string) => {
      const res = await searchKeyword(q);
      const items: KakaoAddressAutocompleteResponseItem[] =
        res?.documents.map((item) => ({
          id: item.id,
          addressName: item.address_name,
          categoryName: item.category_name,
          placeName: item.place_name,
          roadAddressName: item.road_address_name,
          lat: +item.y,
          lng: +item.x,
        })) ?? [];
      setResults(items);
    }, 300),
    [],
  );

  useEffect(() => {
    search(query);
  }, [query, search]);

  return results;
}
