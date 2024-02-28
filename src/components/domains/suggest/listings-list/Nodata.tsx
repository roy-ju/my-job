import Image from 'next/image';

import SuggestNodata from '@/../public/static/images/suggest_nodata.png';

export default function Nodata() {
  return (
    <div tw="px-5 flex-1 min-h-0 overflow-auto flex flex-col items-center">
      <Image src={SuggestNodata.src} width={200} height={128} alt="" />
      <p tw="mt-4 mb-2 text-center text-h2 font-bold">원하는 조건의 매물을 구해보세요.</p>
      <p tw="text-center text-info text-gray-700">
        단지 주변 중개사에게 매물을 추천받고
        <br />이 단지 집주인에게 직접 연락 받을 수 있어요.
      </p>
    </div>
  );
}
