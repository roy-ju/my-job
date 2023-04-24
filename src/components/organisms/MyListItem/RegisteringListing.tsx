import Paths from '@/constants/paths';
import Image from 'next/image';
import { BuyOrRent } from '@/constants/enums';
import { Numeral } from '@/components/atoms';
import { IMyListingListItem } from './Listing';

interface Props extends IMyListingListItem {
  onClickListingItem?: (listingId: number) => () => void;
  statusText?: string;
}

export default function RegisteringListing({
  onClickListingItem,
  listingId,
  thumbnailFullPath,
  listingTitle,
  buyOrRent,
  tradeOrDepositPrice,
  monthlyRentFee,
  statusText,
}: Props) {
  const renderBuyOrRentType = () => {
    switch (buyOrRent) {
      case BuyOrRent.Buy:
        return '매매';
      case BuyOrRent.Jeonsae:
        return '전세';
      default:
        return '월세';
    }
  };

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

  return (
    <button onClick={onClickListingItem?.(listingId)} type="button" tw="flex gap-3 items-center w-full">
      <Image
        src={thumbnailFullPath ?? Paths.DEFAULT_APARTMENT_IMAGE_PATH}
        alt="매물 사진"
        width={92}
        height={92}
        tw="rounded-lg"
      />
      <div tw="flex-1 text-left">
        <div tw="font-bold text-b1">
          {renderBuyOrRentType()}{' '}
          <Numeral thousandsSeparated koreanNumber>
            {renderPrice()}
          </Numeral>
        </div>
        <div tw="text-info text-gray-1000">{listingTitle}</div>
        <div tw="text-info text-gray-700">매물정보는 등록이 완료되면 노출됩니다.</div>
        <div tw="text-info text-nego-1000">{statusText}</div>
      </div>
    </button>
  );
}
