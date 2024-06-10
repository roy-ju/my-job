/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from 'react';

import { NewsItem as NewsItemType } from '@/lib/scrape/scrape';

import moment from 'moment';

import DefaultNewsImage from '@/../public/static/images/danji/news.png';

import {
  ImageWrraper,
  Image,
  StyledLink,
  Column,
  NewsDescription,
  NewsTitle,
  NewsDate,
  FullDiv,
  FlexGapFour,
  SeperatorWithContents,
} from './widget/NewsWidget';

type NewsItemProps = { item: NewsItemType };

export default function NewsItem({ item }: NewsItemProps) {
  const [imgError, setImgError] = useState(false);

  const imgSrc = useMemo(() => {
    if (imgError) return DefaultNewsImage.src;

    if (item?.imageUrl) return item.imageUrl;

    return DefaultNewsImage.src;
  }, [item, imgError]);

  return (
    <>
      <StyledLink
        href={item.link || item.originallink}
        tw="flex flex-col text-left hover:bg-gray-300 py-3 px-5"
        target="_blank"
      >
        <FullDiv>
          <FlexGapFour>
            <ImageWrraper>
              <Image alt="단지 뉴스" src={imgSrc} loading="lazy" onError={() => setImgError(true)} />
            </ImageWrraper>

            <Column>
              <NewsTitle dangerouslySetInnerHTML={{ __html: item.title }} className="news-title" />
              <NewsDescription dangerouslySetInnerHTML={{ __html: item.description }} />
              {item.pubDate && <NewsDate>{moment(item.pubDate).format('YYYY-MM-DD')}</NewsDate>}
            </Column>
          </FlexGapFour>
        </FullDiv>
      </StyledLink>
      <SeperatorWithContents />
    </>
  );
}
