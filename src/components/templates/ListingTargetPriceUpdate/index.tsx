import { Button, Numeral, PersistentBottomBar, Separator } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { ListingSummaryCard } from '@/components/organisms';
import { BuyOrRent } from '@/constants/enums';
import BuyForm from './BuyForm';
import JeonsaeForm from './JeonsaeForm';
import WolsaeForm from './WolsaeForm';

interface Props {
  listingTitle?: string;
  address?: string;
  area?: string;
  floorDescription?: string;
  floor?: string;
  direction?: string;
  listingImagePath?: string;

  listingPrice?: number;
  listingMonthlyRentFee?: number;
  listingBuyOrRent?: number;

  acceptingTargetPrice?: boolean;

  highestPrice?: number;
  highestMonthlyRentFee?: number;

  price?: string;
  onChangePrice?: (value: string) => void;
  monthlyRentFee?: string;
  onChangeMonthlyRentFee?: (value: string) => void;

  onClickBack?: () => void;
  onClickNext?: () => void;
}

export default function ListingTargetPriceUpdate({
  listingTitle = '',
  address = '',
  area = '',
  floorDescription = '',
  floor = '',
  direction = '',
  listingImagePath,

  listingBuyOrRent,
  listingPrice = 0,
  listingMonthlyRentFee = 0,

  highestPrice = 0,
  highestMonthlyRentFee = 0,

  price,
  monthlyRentFee,
  onChangePrice,
  onChangeMonthlyRentFee,

  onClickNext,
  onClickBack,
}: Props) {
  const isNextButtonDisabled = listingBuyOrRent === BuyOrRent.Wolsae ? !price || !monthlyRentFee : !price;

  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>희망가 수정</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-auto">
        <div tw="px-5 pt-7">
          <ListingSummaryCard
            listingTitle={listingTitle}
            address={address}
            area={area}
            floorDescription={floorDescription}
            listingImagePath={listingImagePath}
            floor={floor}
            direction={direction}
          />
        </div>
        <div tw="flex py-7">
          <div tw="flex-1 text-center">
            <div tw="text-info text-gray-700">집주인 희망가</div>
            <div tw="text-b1 font-bold">
              {listingBuyOrRent === BuyOrRent.Wolsae ? (
                <span>
                  <Numeral koreanNumber>{listingPrice}</Numeral> /{' '}
                  <Numeral koreanNumber>{listingMonthlyRentFee}</Numeral>
                </span>
              ) : (
                <span>
                  <Numeral koreanNumber>{listingPrice}</Numeral>
                </span>
              )}
            </div>
          </div>
          <div tw="flex-1 text-center">
            <div tw="text-info text-gray-700">최고 제안가</div>
            <div tw="text-b1 font-bold text-nego-1000">
              {highestPrice ? (
                <div>
                  {listingBuyOrRent === BuyOrRent.Wolsae ? (
                    <span>
                      <Numeral koreanNumber>{highestPrice}</Numeral> /{' '}
                      <Numeral koreanNumber>{highestMonthlyRentFee}</Numeral>
                    </span>
                  ) : (
                    <span>
                      <Numeral koreanNumber>{highestPrice}</Numeral>
                    </span>
                  )}
                </div>
              ) : (
                <span>-</span>
              )}
            </div>
          </div>
        </div>
        <Separator />
        {listingBuyOrRent === BuyOrRent.Buy && <BuyForm price={price} onChangePrice={onChangePrice} />}
        {listingBuyOrRent === BuyOrRent.Jeonsae && <JeonsaeForm price={price} onChangePrice={onChangePrice} />}
        {listingBuyOrRent === BuyOrRent.Wolsae && (
          <WolsaeForm
            price={price}
            onChangePrice={onChangePrice}
            monthlyRentFee={monthlyRentFee}
            onChangeMonthlyRentFee={onChangeMonthlyRentFee}
          />
        )}
      </div>
      <PersistentBottomBar>
        <Button disabled={isNextButtonDisabled} tw="w-full" size="bigger" onClick={onClickNext}>
          다음
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
