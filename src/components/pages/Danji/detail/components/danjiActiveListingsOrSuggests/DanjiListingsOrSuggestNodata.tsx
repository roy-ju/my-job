import { memo } from 'react';

import Image from 'next/image';

import SuggestNodata from '@/../public/static/images/suggest_nodata.png';

import ListingNodata from '@/../public/static/images/listing_nodata.png';

type DanjiListingsOrSuggestNodataProps = {
  type: 'suggest' | 'listing';
};

function DanjiListingsOrSuggestNodata({ type }: DanjiListingsOrSuggestNodataProps) {
  return type === 'suggest' ? (
    <div tw="flex flex-col px-5 items-center">
      <Image src={SuggestNodata.src} width={200} height={128} alt="" />
      <p tw="mt-4 mb-2 text-center text-h2 font-bold">원하는 조건의 매물을 구해보세요.</p>
      <p tw="text-center text-info text-gray-700">
        단지 주변 중개사에게 매물을 추천받고
        <br />이 단지 집주인에게 직접 연락 받을 수 있어요.
      </p>
    </div>
  ) : (
    <div tw="px-5 flex-1 min-h-0 overflow-auto flex flex-col items-center">
      <Image src={ListingNodata.src} width={200} height={128} alt="" />
      <p tw="mt-4 mb-2 text-center text-h2 font-bold">거래를 희망하는 매물을 등록해 보세요.</p>
      <p tw="text-center text-info text-gray-700">
        매물등록만으로 중개사를 배정받고
        <br />
        매수인, 임차인에게 가격을 제안 받을 수 있어요.
      </p>
    </div>
  );
}

export default memo(DanjiListingsOrSuggestNodata);
