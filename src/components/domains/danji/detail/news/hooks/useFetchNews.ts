import { useState } from 'react';

import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';

import { NewsItem as NewsItemType, scrapeNews } from '@/lib/scrape/scrape';

export default function useFetchNews({
  query,
  query2,
  page,
  display = 10,
}: {
  query: string;
  query2?: string;
  page: number;
  display?: number;
}) {
  const [news, setNews] = useState<NewsItemType[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useIsomorphicLayoutEffect(() => {
    async function scrape() {
      if (page === 1) {
        setLoading(true);
      }

      const response = await scrapeNews({
        query,
        query2,
        display,
        start: (page - 1) * display + 1,
        sort: 'date',
      });

      if (response) {
        setNews((prev) => [...prev, ...response]);
      } else {
        setError(true);
      }

      if (page === 1) {
        setLoading(false);
      }
    }

    if (query && page <= 2) {
      scrape();
    }
  }, [query, page]);

  return { news, loading, error };
}
