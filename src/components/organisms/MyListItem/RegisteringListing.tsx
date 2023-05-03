import Image from 'next/image';
import { BuyOrRent, RealestateType } from '@/constants/enums';
import { Numeral, Checkbox } from '@/components/atoms';
import { BuyOrRentString, DefaultListingImage } from '@/constants/strings';
import tw from 'twin.macro';
import { IMyListingListItem } from './Listing';

interface Props extends IMyListingListItem {
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
      disabled={isDeleteActive}
      type="button"
      onClick={onClickListingItem?.(listingId)}
      tw="flex gap-3 w-full py-5 px-5"
      css={[!isDeleteActive && tw`hover:bg-gray-100`]}
    >
      {isDeleteActive && (
        <div tw="mt-[6px]">
          <Checkbox checked={checkedListingIdList?.includes(listingId)} onChange={onChangeCheckbox?.(listingId)} />
        </div>
      )}
      <div tw="flex gap-3 items-center w-full">
        <Image
          src={thumbnailFullPath ?? DefaultListingImage[rt]}
          alt="매물 사진"
          width={92}
          height={92}
          tw="rounded-lg"
        />
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
