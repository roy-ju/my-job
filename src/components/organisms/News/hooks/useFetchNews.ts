import { useState } from 'react';

import { NewsItem as NewsItemType, scrapeNews } from '@/lib/scrape/scrape';

import { useIsomorphicLayoutEffect } from '@/hooks/utils';

export default function useFetchNews({ query, page }: { query: string; page: number }) {
  const [news, setNews] = useState<NewsItemType[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useIsomorphicLayoutEffect(() => {
    const display = 10;

    async function scrape() {
      if (page === 1) {
        setLoading(true);
      }

      const response = await scrapeNews({
        query: `${query}`,
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
