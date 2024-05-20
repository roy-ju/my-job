import Container from '@/components/atoms/Container';

import FlexContents from '@/components/atoms/FlexContents';

import Separator from '@/components/atoms/Separator';

import NavigationHeader from '@/components/molecules/NavigationHeader';

import useTargetPriceUpdateSummaryHandler from './target-price-update-summary/hooks/useTargetPriceUpdateSummaryHandler';

import Title from './target-price-update-summary/Title';

import PricesInfo from './target-price-update-summary/PricesInfo';

import Ctas from './target-price-update-summary/Ctas';

export default function ListingTargetPriceUpdateSummary() {
  const { data, isUpdating, afterMonthlyRentFee, afterPrice, handleClickNext, handleClickBack, handleClickCancel } =
    useTargetPriceUpdateSummaryHandler();

  const beforeMonthlyRentFee = data?.monthly_rent_fee;

  const beforePrice = data?.trade_or_deposit_price;

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>희망가 수정</NavigationHeader.Title>
      </NavigationHeader>
      <FlexContents>
        <Title />
        <Separator />
        <PricesInfo
          afterPrice={afterPrice}
          afterMonthlyRentFee={afterMonthlyRentFee}
          beforePrice={beforePrice}
          beforeMonthlyRentFee={beforeMonthlyRentFee}
        />
      </FlexContents>
      <Ctas handleClickCancel={handleClickCancel} handleClickNext={handleClickNext} isUpdating={isUpdating} />
    </Container>
  );
}
