import { useMemo } from 'react';

import tw from 'twin.macro';

import { NavigationHeader } from '@/components/molecules';

import { VisitUserType } from '@/constants/enums';

import { ListingDetailResponse } from '@/services/listing/types';

import HeartFilledIcon from '@/assets/icons/heart.svg';

import HeartOutlinedIcon from '@/assets/icons/heart_outlined.svg';

import ShareIcon from '@/assets/icons/share.svg';

type ListingDetailHeaderProps = {
  listingDetail?: ListingDetailResponse | null;
  isHeaderActive?: boolean;
  onClickBack?: () => void;
  onClickShare?: () => void;
  onClickFavorite?: () => void;
  onClickMoreItem?: (index: number, buttonTitle: string) => void;
};

export default function ListingDetailHeader({
  listingDetail,
  isHeaderActive,
  onClickBack,
  onClickShare,
  onClickFavorite,
  onClickMoreItem,
}: ListingDetailHeaderProps) {
  const isListingRegisteredBeforeMarch22nd2023 = useMemo(() => {
    const targetDate = new Date('2023-03-22T00:00:00+09:00');
    const dateTimeString = listingDetail?.listing?.created_time;

    if (!dateTimeString) {
      return false;
    }

    const dateTime = new Date(dateTimeString);
    return dateTime < targetDate;
  }, [listingDetail?.listing?.created_time]);

  const commonOptions = isListingRegisteredBeforeMarch22nd2023 ? ['신고하기', '중개약정확인'] : ['신고하기'];

  const sellerOptions = isListingRegisteredBeforeMarch22nd2023
    ? ['신고하기', '매물관리', '중개약정확인']
    : ['신고하기', '매물관리'];

  return (
    <NavigationHeader
      css={[
        tw`absolute top-0 left-0 w-full text-white transition-colors bg-transparent z-[110]`,
        isHeaderActive && tw`bg-white text-gray-1000`,
      ]}
    >
      {onClickBack && <NavigationHeader.BackButton isHeaderActive={!isHeaderActive} onClick={onClickBack} />}
      <NavigationHeader.Title tw="text-inherit">{listingDetail?.listing?.listing_title}</NavigationHeader.Title>
      <div tw="flex gap-4">
        <NavigationHeader.Button onClick={onClickShare}>
          <ShareIcon tw="text-inherit" />
        </NavigationHeader.Button>
        <NavigationHeader.Button onClick={onClickFavorite}>
          {listingDetail?.is_favorite ? <HeartFilledIcon tw="text-red" /> : <HeartOutlinedIcon tw="text-inherit" />}
        </NavigationHeader.Button>
        <NavigationHeader.MoreButton
          iconColor={isHeaderActive ? 'dark' : 'light'}
          onClickItem={onClickMoreItem}
          items={listingDetail?.visit_user_type === VisitUserType.SellerGeneral ? sellerOptions : commonOptions}
        />
      </div>
    </NavigationHeader>
  );
}
