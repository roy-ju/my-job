// import Image from 'next/image';
import Paths from '@/constants/paths';
import { Chip, Numeral } from '@/components/atoms';
import { css } from 'twin.macro';
import { BuyOrRent } from '@/constants/enums';
import { BuyOrRentString, RealestateTypeChipVariant, RealestateTypeString } from '@/constants/strings';
import LikeButton from './LikeButton';
import QuickSaleChip from './QuickSaleChip';
import ListingPopularityInformation from './ListingPopularityInformation';
import ListingStatusChip from './ListingStatusChip';

export interface IMyListingListItem {
  listingId: number;
  thumbnailFullPath: string;
  listingTitle: string;
  realestateType: number;
  jeonyongArea: string;
  floorDescription: string;
  totalFloor: string;
  direction: string;
  buyOrRent: number;
  quickSale: boolean;
  isParticipating: boolean;
  viewCount: number;
  participantsCount: number;
  tradeOrDepositPrice: number;
  monthlyRentFee: number;
  eubmyundong: string;
  isFavorite: boolean;
  labelText: string;
  statusText: string;
}

export interface ListingProps extends IMyListingListItem {
  onToggleListingLike?: (listingId: number, isListingFavorite: boolean) => void;
  onClickListingItem?: (listingId: number) => () => void;
  onNavigateToListingDetailHistory?: (listingId: number, biddingId: number) => () => void;
  biddingId?: number;
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
}: ListingProps) {
  const renderPrice = () => {
    switch (buyOrRent) {
      case BuyOrRent.Buy:
        return tradeOrDepositPrice;
      case BuyOrRent.Jeonsae:
        return tradeOrDepositPrice;
      default:
        return monthlyRentFee;
    }
  };

  const isMyPage = window.location.pathname.includes('my/');
  const isOnClickToNavigate = biddingId;

  return (
    <button
      type="button"
      tw="flex gap-3 items-center w-full hover:bg-gray-100 px-5 py-5"
      onClick={
        isOnClickToNavigate ? onNavigateToListingDetailHistory?.(listingId, biddingId) : onClickListingItem?.(listingId)
      }
    >
      <div tw="relative">
        <ListingStatusChip status={labelText} />
        <div
          tw="rounded-lg w-[92px] h-[92px] bg-no-repeat bg-center bg-cover"
          style={{
            backgroundImage: `url('${thumbnailFullPath ?? Paths.DEFAULT_APARTMENT_IMAGE_PATH}')`,
          }}
        />
      </div>
      <div tw="flex-1">
        <div tw="mb-1.5 flex justify-between">
          <div tw="flex gap-1">
            <Chip variant={RealestateTypeChipVariant[realestateType]}>{RealestateTypeString[realestateType]}</Chip>
            {eubmyundong && <Chip variant="gray">{eubmyundong}</Chip>}
          </div>
          {!isMyPage && (
            <LikeButton onLike={(active) => onToggleListingLike?.(listingId, active)} isFavorite={isFavorite} />
          )}
        </div>
        <div tw="font-bold text-b1 flex gap-1.5 items-center">
          {quickSale && <QuickSaleChip />} {BuyOrRentString[buyOrRent]}{' '}
          <Numeral thousandsSeparated koreanNumber>
            {renderPrice()}
          </Numeral>
        </div>
        <div tw="text-info text-left">{listingTitle}</div>
        <div tw="flex justify-between items-center">
          <div tw="flex text-info text-gray-700" css={informationStringWrapper}>
            {jeonyongArea && <div>{`전용 ${jeonyongArea}㎡`}</div>}
            <div>{totalFloor && floorDescription && `${floorDescription?.[0]}/${totalFloor}층`}</div>
            <div>{direction}</div>
          </div>
          <ListingPopularityInformation viewCount={viewCount} offerCount={participantsCount} />
        </div>
      </div>
    </button>
  );
}
