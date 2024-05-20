import Button from '@/components/atoms/Button';

import Container from '@/components/atoms/Container';

import FlexContents from '@/components/atoms/FlexContents';

import PersistentBottomBar from '@/components/atoms/PersistentBottomBar';

import Separator from '@/components/atoms/Separator';

import NavigationHeader from '@/components/molecules/NavigationHeader';

import ListingSummaryCard from '@/components/organisms/listing/ListingSummaryCard';

import { BuyOrRent } from '@/constants/enums';

import useTargetPriceUpdateHandler from './target-price-update/hooks/useTargetPriceUpdateHandler';

import PricesInfos from './target-price-update/PricesInfos';

import BuyForm from './target-price-update/BuyForm';

import JeonsaeForm from './target-price-update/JeonsaeForm';

import WolsaeForm from './target-price-update/WolsaeForm';

export default function ListingTargetPriceUpdate() {
  const { data, platform, price, monthlyRentFee, setPrice, setMonthlyRentFee, handleNext, handleClickBack } =
    useTargetPriceUpdateHandler();

  const isNextButtonDisabled = data?.listing?.buy_or_rent === BuyOrRent.Wolsae ? !price || !monthlyRentFee : !price;

  return (
    <Container>
      <NavigationHeader>
        {platform === 'mobile' && <NavigationHeader.BackButton onClick={handleClickBack} />}
        <NavigationHeader.Title>희망가 수정</NavigationHeader.Title>
      </NavigationHeader>
      <FlexContents>
        <div tw="px-5 pt-7">
          <ListingSummaryCard
            listingTitle={data?.listing?.listing_title ?? ''}
            address={data?.display_address ?? ''}
            area={data?.listing?.jeonyong_area ?? ''}
            floorDescription={data?.listing?.floor_description ?? ''}
            floor={data?.listing?.floor ?? ''}
            direction={data?.listing?.direction ?? ''}
          />
        </div>
        <PricesInfos
          listingBuyOrRent={data?.listing?.buy_or_rent}
          listingPrice={data?.trade_or_deposit_price ?? 0}
          listingMonthlyRentFee={data?.monthly_rent_fee ?? 0}
          highestMonthlyRentFee={data?.highest_bidding_monthly_rent_fee ?? 0}
          highestPrice={data?.highest_bidding_trade_or_deposit_price ?? 0}
        />
        <Separator />
        {data?.listing?.buy_or_rent === BuyOrRent.Buy && <BuyForm price={price} onChangePrice={setPrice} />}
        {data?.listing?.buy_or_rent === BuyOrRent.Jeonsae && <JeonsaeForm price={price} onChangePrice={setPrice} />}
        {data?.listing?.buy_or_rent === BuyOrRent.Wolsae && (
          <WolsaeForm
            price={price}
            onChangePrice={setPrice}
            monthlyRentFee={monthlyRentFee}
            onChangeMonthlyRentFee={setMonthlyRentFee}
          />
        )}
      </FlexContents>

      <PersistentBottomBar>
        <Button disabled={isNextButtonDisabled} tw="w-full" size="bigger" onClick={handleNext}>
          다음
        </Button>
      </PersistentBottomBar>
    </Container>
  );
}
