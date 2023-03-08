import { searchKeyword } from '@/lib/kakao';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

interface ResponseItem {
  id: string;
  addressName: string;
  categoryName: string;
  placeName: string;
  roadAddressName: string;
}

export default function useKakaoAddressAutocomplete(query: string) {
  const [results, setResults] = useState<ResponseItem[]>([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useCallback(
    _.debounce(async (q: string) => {
      const res = await searchKeyword(q);
      const items: ResponseItem[] =
        res?.documents.map((item) => ({
          id: item.id,
          addressName: item.address_name,
          categoryName: item.category_name,
          placeName: item.place_name,
          roadAddressName: item.road_address_name,
        })) ?? [];
      setResults(items);
    }, 300),
    [],
  );

  useEffect(() => {
    if (query) {
      search(query);
    } else {
      setResults([]);
    }
  }, [query, search]);

  return results;
}
