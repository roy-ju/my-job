import Image from 'next/image';

import ListingNodata from '@/../public/static/images/listing_nodata.png';

function Nodata() {
  return (
    <div tw="px-5 flex flex-col items-center">
      <Image src={ListingNodata.src} width={200} height={128} alt="" />
      <p tw="mt-4 mb-2 text-center text-h2 font-bold">해당 단지에 등록된 매물이 없어요!</p>
      <p tw="text-center text-info text-gray-700">
        해당 단지에 매물을 가지고 있다면
        <br />
        우리집 등록 후 매물을 등록해보세요!
      </p>
    </div>
  );
}

export default Nodata;
