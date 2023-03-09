import { searchKeyword } from '@/lib/kakao';
import { searchAddress } from '@/lib/kakao/search_address';
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
      if (!q) {
        setResults([]);
        return;
      }

      const [keywordRes, addressRes] = await Promise.all([
        searchKeyword(q),
        searchAddress(q),
      ]);

      const keywordItems: KakaoAddressAutocompleteResponseItem[] =
        keywordRes?.documents.map((item) => ({
          id: item.id,
          addressName: item.address_name,
          categoryName: item.category_name.split('>').pop()?.trim() ?? '',
          placeName: item.place_name,
          roadAddressName: item.road_address_name,
          lat: +item.y,
          lng: +item.x,
        })) ?? [];

      const addressItems: KakaoAddressAutocompleteResponseItem[] =
        addressRes?.documents
          .filter((item) => item.address && item.address.b_code)
          .map((item) => ({
            id: item.address?.b_code ?? '',
            addressName: item.address_name,
            categoryName: '지역',
            placeName: item.address_name,
            roadAddressName: item.road_address?.address_name ?? '',
            lat: +item.y,
            lng: +item.x,
          })) ?? [];

      setResults([...addressItems, ...keywordItems]);
    }, 300),
    [],
  );

  useEffect(() => {
    search(query);
  }, [query, search]);

  return results;
}
