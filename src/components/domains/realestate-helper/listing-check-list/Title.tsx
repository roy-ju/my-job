import { memo } from 'react';

import Image from 'next/image';

import { MarginTopTwenty } from '@/components/atoms/Margin';

import { TitleWrraper } from './widget/ListingCheckListWidget';

type TitleProps = { title: string; url: string; alt: string };

function Title({ title, url, alt }: TitleProps) {
  return (
    <>
      <TitleWrraper>
        <Image src={url} width={24} height={24} alt={alt} />
        {title}
      </TitleWrraper>
      <MarginTopTwenty />
    </>
  );
}

export default memo(Title);
