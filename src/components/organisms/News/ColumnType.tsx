import { Fragment, memo, useState } from 'react';

import { Button } from '@/components/atoms';

import { Skeletons } from '@/components/molecules';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import NewsItem from './NewsItem';

import useFetchNews from './hooks/useFetchNews';

function makeKey(v1: string, v2: string, v3: string, v4: number) {
  return `${v1}-${v2}-${v3}-${v4}`;
}

function ColumnType({
  title = '단지 최신 뉴스 TOP10',
  query,
  query2,
}: {
  title?: string;
  query: string;
  query2: string;
}) {
  const { news, loading, error } = useFetchNews({ query, query2, page: 1 });

  const { platform } = useCheckPlatform();

  const [sliceDisplay, setSliceDisplay] = useState(3);

  const handleMoreView = () => {
    if (sliceDisplay < 11) {
      setSliceDisplay((prev) => prev + 7);
    }

    setTimeout(() => {
      const element = document.getElementById('negocio-danjidetail-bottom');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  };

  const handleCloseView = () => {
    setSliceDisplay(3);

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

  if (error) return null;

  return (
    <div tw="flex flex-col py-10">
      <h2 tw="font-bold text-b1 mb-1 px-5">{title}</h2>

      <div tw="flex flex-col">
        {loading
          ? [1, 2, 3, 4, 5].map((item) => (
              <Fragment key={`${item}`}>
                <Skeletons.NewsItem />
              </Fragment>
            ))
          : news
              .slice(0, sliceDisplay)
              .map((item, index) => (
                <NewsItem
                  key={makeKey(item.title || '', item.pubDate || '', item.description || '', index)}
                  item={item}
                />
              ))}
      </div>

      <div tw="w-full flex flex-col gap-4 px-5 mt-1 h-10">
        {!loading && sliceDisplay < 10 ? (
          <Button variant="outlined" onClick={handleMoreView}>
            더보기
          </Button>
        ) : (
          <Button variant="outlined" onClick={handleCloseView}>
            접기
          </Button>
        )}
      </div>

      {platform === 'mobile' && <div tw="[min-height: 114px]" id="negocio-danjidetail-bottom" />}
    </div>
  );
}

export default memo(ColumnType);
