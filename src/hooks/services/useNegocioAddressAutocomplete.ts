import searchDanji, { SearchDanjiResponseItem } from '@/apis/danji/searchDanji';
import { useEffect, useState, useCallback } from 'react';
import _ from 'lodash';

export default function useNegocioAddressAutocomplete(query: string) {
  const [results, setResults] = useState<SearchDanjiResponseItem[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useCallback(
    _.debounce(async (q: string) => {
      if (!q) {
        setResults([]);
        return;
      }
      const { page_number, list } = await searchDanji({ query: q, page_number: 1 });
      setResults(list);
      setPageNumber(page_number);
    }, 300),
    [],
  );

  useEffect(() => {
    search(query);
  }, [query, search]);

  return results ?? [];
}
