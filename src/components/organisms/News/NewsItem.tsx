import Link from 'next/link';

import Image from 'next/image';

import Paths from '@/constants/paths';

import tw, { styled } from 'twin.macro';

import { NewsItem as NewsItemType } from '@/lib/scrape/scrape';
import { useMemo, useState } from 'react';

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
    if (imgError) return Paths.DEFAULT_APARTMENT_IMAGE_PATH;

    if (item?.imageUrl) return item.imageUrl;

    return Paths.DEFAULT_APARTMENT_IMAGE_PATH;
  }, [item, imgError]);

  return (
    <>
      <StyledLink
        href={item.link || item.originallink}
        tw="flex flex-col text-left hover:bg-gray-300 py-3 px-5"
        target="_blank"
      >
        <div tw="w-full">
          <div
            tw="text-body_02 text-ellipsis overflow-hidden whitespace-nowrap mb-2"
            dangerouslySetInnerHTML={{ __html: item.title }}
            className="news-title"
          />
        </div>
        <div tw="flex gap-4">
          <div tw="relative w-[80px] h-[80px] min-w-[80px] min-h-[80px]">
            <Image
              tw="[object-fit: cover] w-full h-full rounded-lg"
              width={80}
              height={80}
              priority
              alt=""
              src={imgSrc}
              onError={() => setImgError(true)}
            />
          </div>
          <div tw="max-w-[240px] flex flex-col justify-between  text-gray-700">
            <div tw="text-info line-clamp-2" dangerouslySetInnerHTML={{ __html: item.description }} />

            <p tw="ml-auto text-info [text-decoration-line: underline]">뉴스보러가기</p>
          </div>
        </div>
      </StyledLink>
      <div tw="border-b mx-5 last-of-type:[display: none]" />
    </>
  );
}
