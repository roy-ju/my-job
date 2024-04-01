import Image from 'next/image';

import tw from 'twin.macro';

import { Numeral, Checkbox } from '@/components/atoms';

import { BuyOrRent, RealestateType } from '@/constants/enums';

import { BuyOrRentString, DefaultListingImage } from '@/constants/strings';

import { ListingProps } from './Listing';

interface Props extends ListingProps {
  onClickListingItem?: (listingId: number) => () => void;
  onChangeCheckbox?: (listingId: number) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  statusText: string;
  isDeleteActive: boolean;
  checkedListingIdList: number[];
}

export default function RegisteringListing({
  isDeleteActive,
  checkedListingIdList,
  onClickListingItem,
  onChangeCheckbox,
  listingId,
  thumbnailFullPath,
  listingTitle,
  buyOrRent,
  tradeOrDepositPrice,
  realestateType,
  monthlyRentFee,
  statusText,
}: Props) {
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

  const rt = realestateType ?? RealestateType.Apartment;

  return (
    <button
      type="button"
      onClick={onClickListingItem?.(listingId)}
      tw="flex gap-3 w-full py-5 px-5"
      css={[!isDeleteActive ? tw`hover:bg-gray-100` : tw`cursor-default`]}
    >
      <div tw="flex gap-3 items-center w-full">
        <div tw="flex gap-3">
          {isDeleteActive && (
            <div tw="">
              <Checkbox checked={checkedListingIdList?.includes(listingId)} onChange={onChangeCheckbox?.(listingId)} />
            </div>
          )}
          <Image
            src={thumbnailFullPath ?? DefaultListingImage[rt]}
            alt="매물 사진"
            width={92}
            height={92}
            tw="rounded-lg"
          />
        </div>
        <div tw="flex-1 text-left">
          <div tw="font-bold text-b1">
            {BuyOrRentString[buyOrRent]}{' '}
            <Numeral thousandsSeparated koreanNumber>
              {renderPrice()}
            </Numeral>
          </div>
          <div tw="text-info text-gray-1000">{listingTitle}</div>
          <div tw="text-info text-gray-700">매물정보는 등록이 완료되면 노출됩니다.</div>
          <div tw="text-info text-nego-1000">{statusText}</div>
        </div>
      </div>
    </button>
  );
}
