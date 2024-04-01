import { Chip, Numeral } from '@/components/atoms';

import { css } from 'twin.macro';

import { BuyOrRent } from '@/constants/enums';

import {
  BuyOrRentString,
  DefaultListingImage,
  RealestateTypeChipVariant,
  RealestateTypeString,
} from '@/constants/strings';

import { MyFavoriteListingListUiItem } from '@/components/domains/my/favorite-list/types';

import LikeButton from './LikeButton';

import QuicksaleChip from './QuicksaleChip';

import ListingPopularityInformation from './ListingPopularityInformation';

import ListingStatusChip from './ListingStatusChip';

export interface ListingProps extends MyFavoriteListingListUiItem {
  onToggleListingLike?: (listingId: number, isListingFavorite: boolean) => void;
  onClickListingItem?: (listingId: number, buyOrRent: number) => () => void;
  onNavigateToListingDetailHistory?: (listingId: number, biddingId: number) => () => void;
  biddingId?: number;
  showPopularityInformation?: boolean;
  showLikeButton?: boolean;
}

const informationStringWrapper = css`
  & > div:not(:first-of-type)::before {
    content: ' | ';
    margin: 0 0.25rem;
    color: #e9ecef; // text-gray-300
  }
`;

export default function Listing({
  onToggleListingLike,
  onClickListingItem,
  onNavigateToListingDetailHistory,
  listingId,
  thumbnailFullPath,
  listingTitle,
  realestateType,
  jeonyongArea,
  floorDescription,
  totalFloor,
  direction,
  buyOrRent,
  quickSale,
  viewCount,
  participantsCount,
  tradeOrDepositPrice,
  monthlyRentFee,
  eubmyundong,
  isFavorite,
  labelText,
  biddingId,
  showPopularityInformation = true,
  showLikeButton = true,
}: ListingProps) {
  const renderPrice = () => {
    switch (buyOrRent) {
      case BuyOrRent.Buy:
        return (
          <Numeral thousandsSeparated koreanNumber>
            {tradeOrDepositPrice}
          </Numeral>
        );
      case BuyOrRent.Jeonsae:
        return (
          <Numeral thousandsSeparated koreanNumber>
            {tradeOrDepositPrice}
          </Numeral>
        );
      default:
        return (
          <>
            <Numeral thousandsSeparated koreanNumber>
              {tradeOrDepositPrice}
            </Numeral>
            {' / '}
            <Numeral thousandsSeparated koreanNumber>
              {monthlyRentFee}
            </Numeral>
          </>
        );
    }
  };

  const isOnClickToNavigate = biddingId;

  return (
    <button
      type="button"
      tw="flex gap-3 items-center w-full hover:bg-gray-100 px-5 py-5"
      onClick={
        isOnClickToNavigate
          ? onNavigateToListingDetailHistory?.(listingId, biddingId)
          : onClickListingItem?.(listingId, buyOrRent)
      }
    >
      <div tw="relative">
        <ListingStatusChip status={labelText} />
        <div
          tw="rounded-lg w-[92px] h-[92px] bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url('${thumbnailFullPath ?? DefaultListingImage[realestateType]}')`,
          }}
        />
      </div>
      <div tw="flex-1">
        <div tw="mb-1.5 flex justify-between">
          <div tw="flex gap-1">
            <Chip variant={RealestateTypeChipVariant[realestateType]}>{RealestateTypeString[realestateType]}</Chip>
            {eubmyundong && <Chip variant="gray">{eubmyundong}</Chip>}
          </div>
          {showLikeButton && (
            <LikeButton onLike={(active) => onToggleListingLike?.(listingId, active)} isFavorite={isFavorite} />
          )}
        </div>
        <div tw="font-bold text-b1 flex gap-1.5">
          {quickSale && (
            <div tw="pt-[3px]">
              <QuicksaleChip />
            </div>
          )}{' '}
          <div tw="text-start">
            <span tw="whitespace-nowrap">{BuyOrRentString[buyOrRent]}</span> <span>{renderPrice()}</span>
          </div>
        </div>
        <div tw="text-info text-left">{listingTitle}</div>
        <div tw="flex justify-between items-center">
          <div tw="flex text-info text-gray-700" css={informationStringWrapper}>
            {jeonyongArea && <div>{`전용 ${Number(jeonyongArea).toFixed(0)}㎡`}</div>}
            <div>{floorDescription ? `${floorDescription?.[0]}/${totalFloor}층` : `${totalFloor}층`}</div>
            <div>{direction}</div>
          </div>
          {showPopularityInformation && (
            <ListingPopularityInformation viewCount={viewCount} offerCount={participantsCount} />
          )}
        </div>
      </div>
    </button>
  );
}
