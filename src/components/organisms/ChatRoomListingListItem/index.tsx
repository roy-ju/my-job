import Paths from '@/constants/paths';
import tw, { css } from 'twin.macro';
import { Numeral, Chip } from '@/components/atoms';
import { BuyOrRent } from '@/constants/enums';
import { BuyOrRentString } from '@/constants/strings';

interface ChatRoomListingListItemProps {
  listingId: number;
  biddingId: number;
  listingStatus: number;
  buyOrRent: number;
  tradeOrDepositPrice: number;
  monthlyRentFee: number;
  listingTitle: string;
  jeonyongArea: string;
  thumbnailFullPath: string;
  floorDescription: string;
  totalFloor: string;
  direction: string;
  labelText: string;

  onClickNavigateToListingDetail?: (listingId: number) => () => void;
  onClickNavigateToListingDetailHistory?: (listingId: number, biddingId: number) => () => void;
}

const informationStringWrapper = css`
  ${tw`flex h-full text-gray-700 text-info`}
  & > div:not(:first-of-type)::before {
    content: ' | ';
    margin: 0 0.25rem;
    color: #e9ecef; // text-gray-300
  }
`;

const chipVariants: {
  [key: string]: {
    color: 'lightBlue' | 'black' | 'nego';
  };
} = {
  등록신청: {
    color: 'lightBlue',
  },
  '가계약금 입금': {
    color: 'black',
  },
  '체결 매물': {
    color: 'nego',
  },
};

export default function ChatRoomListingListItem({
  listingId,
  biddingId,
  buyOrRent,
  tradeOrDepositPrice,
  monthlyRentFee,
  listingTitle,
  jeonyongArea,
  thumbnailFullPath,
  floorDescription,
  totalFloor,
  direction,
  labelText,

  onClickNavigateToListingDetail,
  onClickNavigateToListingDetailHistory,
}: ChatRoomListingListItemProps) {
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

  return (
    <button
      type="button"
      tw="flex gap-3 items-center w-full hover:bg-gray-100 px-5 pt-[26px] pb-[24px]"
      onClick={
        labelText === '체결 매물'
          ? onClickNavigateToListingDetailHistory?.(listingId, biddingId)
          : onClickNavigateToListingDetail?.(listingId)
      }
    >
      <div tw="flex-1 self-start">
        <div tw="mb-1.5 flex justify-between">
          <div tw="flex gap-1">{labelText && <Chip variant={chipVariants?.[labelText]?.color}>{labelText}</Chip>}</div>
        </div>
        <div tw="font-bold text-b1 flex gap-1.5 items-center">
          {BuyOrRentString[buyOrRent]} {renderPrice()}
        </div>
        <div tw="text-info text-left">{listingTitle}</div>
        <div tw="flex justify-between items-center">
          {labelText === '등록신청' ? (
            <p tw="text-info text-gray-700">매물정보는 등록이 완료되면 노출됩니다.</p>
          ) : (
            <div tw="flex text-info text-gray-700" css={informationStringWrapper}>
              {jeonyongArea && <div>{`전용 ${jeonyongArea}㎡`}</div>}
              <div>{totalFloor && floorDescription && `${floorDescription?.[0]}/${totalFloor}층`}</div>
              <div>{direction}</div>
            </div>
          )}
        </div>
      </div>
      <div
        tw="rounded-lg w-[64px] h-[64px] bg-no-repeat bg-center bg-cover self-start"
        style={{
          backgroundImage: `url('${thumbnailFullPath ?? Paths.DEFAULT_APARTMENT_IMAGE_PATH}')`,
        }}
      />
    </button>
  );
}
