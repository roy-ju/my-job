import { Fragment, memo, useState } from 'react';

import { useIsomorphicLayoutEffect } from '@/hooks/utils';

import { Button } from '@/components/atoms';

import { Skeletons } from '@/components/molecules';

import { NewsItem as NewsItemType, scrapeNews } from '@/lib/scrape/scrape';

import { checkPlatform } from '@/utils/checkPlatform';
import NewsItem from './NewsItem';

function makeKey(v1: string, v2: string, v3: string, v4: number) {
  return `${v1}-${v2}-${v3}-${v4}`;
}

function ColumnType({ title = '단지뉴스', query }: { title?: string; query: string }) {
  const [news, setNews] = useState<NewsItemType[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  const [page, setPage] = useState(1);

  const [sliceDisplay, setSliceDisplay] = useState(5);

  const [mobileOrPC, setMobileOrPC] = useState('');

  const handleMoreView = () => {
    if (page < 2) {
      setPage(page + 1);
    }

    if (sliceDisplay < 20) {
      setSliceDisplay((prev) => prev + 5);
    }

    setTimeout(() => {
      const element = document.getElementById('negocio-danjidetail-bottom');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleCloseView = () => {
    setSliceDisplay(5);

    setTimeout(() => {
      const container = document.getElementById('scroll-container');
      const element = document.getElementById('newsSection');

      if (container && element) {
        container.scrollBy({
          top: (element.getBoundingClientRect().top ?? 0) - 103,
          behavior: 'smooth',
        });
      }
    }, 300);
  };

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

  useIsomorphicLayoutEffect(() => {
    const platform = checkPlatform();
    setMobileOrPC(platform);
  }, []);

  if (!news.length) return null;

  if (error) return null;

  return (
    <div tw="flex flex-col py-10">
      <h2 tw="font-bold text-b1 mb-1 px-5">{title}</h2>

      <div tw="flex flex-col">
        {page === 1 && loading
          ? [1, 2, 3, 4, 5].map((item) => (
              <Fragment key={`${item}`}>
                <Skeletons.NewsItem />
              </Fragment>
            ))
          : news
              .slice(0, sliceDisplay)
              .map((item, index) => (
                <NewsItem
                  item={item}
                  key={makeKey(item.title || '', item.pubDate || '', item.description || '', index)}
                />
              ))}
      </div>

      <div tw="w-full flex flex-col gap-4 px-5 mt-7 min-h-[48px]">
        {!loading && sliceDisplay < 20 ? (
          <Button variant="outlined" onClick={handleMoreView}>
            더보기
          </Button>
        ) : (
          <Button variant="outlined" onClick={handleCloseView}>
            접기
          </Button>
        )}
      </div>

      {mobileOrPC === 'mobile' && <div tw="[min-height: 114px]" id="negocio-danjidetail-bottom" />}
    </div>
  );
}

export default memo(ColumnType);
