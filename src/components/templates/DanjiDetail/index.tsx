/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { GetDanjiListingsResponse } from '@/apis/danji/danjiListingsList';
import { GetDanjiPhotosResponse } from '@/apis/danji/danjiPhotos';
import { GetDanjiRealPricesPyoungListResponse } from '@/apis/danji/danjiRealPricesPyoungList';
import { Separator } from '@/components/atoms';

import { DanjiDetailSection } from '@/components/organisms';
import tw from 'twin.macro';

interface Props {
  danji?: GetDanjiDetailResponse;
  danjiPhotos?: GetDanjiPhotosResponse;
  danjiListings?: GetDanjiListingsResponse['list'];
  danjiRealPricesData?: GetDanjiRealPricesPyoungListResponse;
  danjiRealPricesPyoungList?: GetDanjiRealPricesPyoungListResponse['list'];
  buyOrRent?: number;
  selectedYear?: number;
  isShowDanjiPhotos?: boolean;
  onClickListingDetail: () => void;
  onChangeBuyOrRent?: (value: number) => void;
  onChangeSelectedYear?: (value: number) => void;
}

export default function DanjiDetail({
  danji,
  danjiPhotos,
  danjiListings,
  danjiRealPricesData,
  danjiRealPricesPyoungList,
  buyOrRent,
  selectedYear,
  isShowDanjiPhotos,
  onClickListingDetail,
  onChangeBuyOrRent,
  onChangeSelectedYear,
}: Props) {
  if (!danji) return null;

  return (
    <div tw="flex flex-col h-full">
      <DanjiDetailSection>
        <div tw="pt-6" css={[danjiListings && danjiListings.length > 3 ? tw`pb-10` : tw`pb-5`]}>
          <DanjiDetailSection.Info danji={danji} />
          {danjiListings && danjiListings.length > 1 && (
            <>
              <DanjiDetailSection.ActiveInfo danjiListings={danjiListings} />
            </>
          )}
        </div>
        <Separator tw="h-2 bg-gray-300" />
        <div tw="pt-10">
          <DanjiDetailSection.RealPriceInfo
            buyOrRent={buyOrRent}
            danjiRealPricesData={danjiRealPricesData}
            danjiRealPricesPyoungList={danjiRealPricesPyoungList}
            selectedYear={selectedYear}
            onChangeBuyOrRent={onChangeBuyOrRent}
            onChangeSelectedYear={onChangeSelectedYear}
          />
        </div>
      </DanjiDetailSection>
    </div>
  );
}
