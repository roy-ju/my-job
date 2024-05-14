import { useCallback } from 'react';

import { toast } from 'react-toastify';

import kakaoShare from '@/utils/kakaoShare';

import { ListingDetailResponse } from '@/services/listing/types';

import formatNumberInKorean from '@/utils/formatNumberInKorean';

import { BuyOrRent } from '@/constants/enums';

import Paths from '@/constants/paths';

import { RealestateTypeString, BuyOrRentString } from '@/constants/strings';

import Routes from '@/router/routes';

export default function useShareHandler({
  data,
  handleClosePopup,
}: {
  data?: ListingDetailResponse & ErrorResponse;
  handleClosePopup: () => void;
}) {
  const handleCopyUrl = useCallback(() => {
    let priceText = '';

    if (data?.listing?.buy_or_rent === BuyOrRent.Wolsae) {
      priceText = `${formatNumberInKorean(data?.trade_or_deposit_price)}/${formatNumberInKorean(
        data?.monthly_rent_fee,
      )}`;
    } else {
      priceText = `${formatNumberInKorean(data?.trade_or_deposit_price ?? 0)}`;
    }

    const content = `[네고시오] ${data?.display_address}\n► 부동산 종류 : ${
      RealestateTypeString[data?.listing?.realestate_type ?? 0]
    }\n► 거래종류 : ${BuyOrRentString[data?.listing?.buy_or_rent ?? 0]}\n► 집주인 희망가 :${priceText}\n\n${
      window.origin
    }/${Routes.ListingDetail}?listingID=${data?.listing?.id}`;

    navigator.clipboard.writeText(content);

    handleClosePopup();

    toast.success('복사되었습니다.');
  }, [data, handleClosePopup]);

  const handleShareViaKakao = useCallback(() => {
    const link = `${window.origin}/${Routes.ListingDetail}?listingID=${data?.listing?.id}`;

    let description = data?.display_address;

    if (data?.listing?.buy_or_rent === BuyOrRent.Wolsae) {
      description = `${formatNumberInKorean(data?.trade_or_deposit_price)}/${formatNumberInKorean(
        data?.monthly_rent_fee,
      )}, ${data?.display_address}`;
    } else {
      description = `${formatNumberInKorean(data?.trade_or_deposit_price ?? 0)}, ${data?.display_address}`;
    }

    kakaoShare({
      width: 1200,
      height: 630,
      objectType: 'feed',
      title: data?.listing?.listing_title ?? '',
      description,
      imgUrl: Paths.DEFAULT_OPEN_GRAPH_IMAGE_2,
      buttonTitle: '자세히보기',
      link,
    });
  }, [data]);

  return { handleCopyUrl, handleShareViaKakao };
}
