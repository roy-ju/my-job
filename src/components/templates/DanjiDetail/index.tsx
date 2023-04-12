/* eslint-disable @typescript-eslint/no-unused-vars */
import { GetDanjiDetailResponse } from '@/apis/danji/danjiDetail';
import { GetDanjiListingsResponse } from '@/apis/danji/danjiListingsList';
import { GetDanjiPhotosResponse } from '@/apis/danji/danjiPhotos';

import { DanjiDetailSection } from '@/components/organisms';
import tw from 'twin.macro';

interface Props {
  danji?: GetDanjiDetailResponse;
  danjiPhotos?: GetDanjiPhotosResponse;
  danjiListings?: GetDanjiListingsResponse['list'];
  isShowDanjiPhotos?: boolean;
  onClickListingDetail: () => void;
}

export default function DanjiDetail({
  danji,
  danjiPhotos,
  danjiListings,
  isShowDanjiPhotos,
  onClickListingDetail,
}: Props) {
  if (!danji) return null;

  return (
    <div tw="flex flex-col h-full">
      <DanjiDetailSection>
        <div tw="pt-6" css={[danjiListings && danjiListings.length >= 3 ? tw`pb-10` : tw`pb-5`]}>
          <DanjiDetailSection.Info danji={danji} />
          {danjiListings && danjiListings.length > 1 && (
            <>
              <DanjiDetailSection.ActiveInfo danjiListings={danjiListings} />
            </>
          )}
        </div>
      </DanjiDetailSection>
    </div>
  );
}
