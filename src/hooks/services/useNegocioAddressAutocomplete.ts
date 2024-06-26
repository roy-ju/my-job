import searchDanji, { SearchDanjiResponseItem } from '@/apis/danji/searchDanji';
import debounce from 'lodash/debounce';
import { useEffect, useState, useCallback } from 'react';

export default function useNegocioAddressAutocomplete(query: string) {
  const [results, setResults] = useState<SearchDanjiResponseItem[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useCallback(
    debounce(async (q: string) => {
      if (!q) {
        setResults([]);
        setPageNumber(1);
        return;
      }
      const list = await searchDanji({ query: q, page_number: pageNumber });

      setResults([...results, ...list]);
    }, 300),
    [pageNumber],
  );

  const handleChangePage = useCallback(() => {
    setPageNumber((prev) => prev + 1);
  }, []);

  useEffect(() => {
    search(query);
  }, [query, search]);

  return { results: results ?? [], handleChangePage };
}
