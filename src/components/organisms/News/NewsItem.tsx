/* eslint-disable @next/next/no-img-element */
import { useMemo, useState } from 'react';

import Link from 'next/link';

import tw, { styled } from 'twin.macro';

import { NewsItem as NewsItemType } from '@/lib/scrape/scrape';

import moment from 'moment';

import DefaultNewsImage from '@/../public/static/images/danji/news.png';

const StyledLink = styled(Link)`
  b {
    ${tw`[font-weight: inherit]`}
  }

  :hover {
    .news-title {
      ${tw`[text-decoration-line: underline]`}
    }
    p {
      ${tw`text-gray-1000`}
    }
  }
`;

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
        <div tw="w-full">
          <div tw="flex gap-4">
            <div tw="relative w-[80px] h-[80px] min-w-[80px] min-h-[80px]">
              <img
                tw="w-full h-full absolute top-0 left-0 [object-fit: cover] rounded-lg"
                alt="단지 뉴스"
                src={imgSrc}
                loading="lazy"
                onError={() => setImgError(true)}
              />
            </div>

            <div tw="flex flex-col">
              <div
                tw="text-subhead_02 line-clamp-1 mb-1"
                dangerouslySetInnerHTML={{ __html: item.title }}
                className="news-title"
              />

              <div
                tw="text-body_01 text-gray-700 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />

              {item.pubDate && <div tw="text-info text-gray-600">{moment(item.pubDate).format('YYYY-MM-DD')}</div>}
            </div>
          </div>
        </div>
      </StyledLink>
      <div tw="border-b mx-5 last-of-type:[display: none]" />
    </>
  );
}
