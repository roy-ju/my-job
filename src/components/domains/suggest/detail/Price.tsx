import tw, { styled } from 'twin.macro';

import { Numeral } from '@/components/atoms';

import { BuyOrRent, describeJeonsaeWolsaeSame } from '@/constants/enums';

const Container = styled.div`
  ${tw`flex flex-row items-center gap-1`}
`;

const PriceWrraper = styled.div`
  ${tw`text-gray-800 whitespace-pre-line text-heading_01`}
`;

const Negotiable = styled.span`
  ${tw`text-gray-600 text-body_02`}
`;

export default function Price({
  tradeOrDepositPrice,
  monthlyRentFee,
  quickSale,
  negotiable,
}: {
  tradeOrDepositPrice: number;
  monthlyRentFee: number;
  quickSale: boolean;
  negotiable: boolean;
}) {
  if (quickSale)
    return (
      <Container>
        <PriceWrraper id="suggest-detail-price-field">매매 급매물 구해요</PriceWrraper>{' '}
        {negotiable && <Negotiable>(협의가능)</Negotiable>}
      </Container>
    );

  if (monthlyRentFee) {
    return (
      <Container>
        <PriceWrraper id="suggest-detail-price-field" css={[negotiable ? tw`[max-width: 274px]` : tw`w-full`]}>
          {describeJeonsaeWolsaeSame(BuyOrRent.Jeonsae)} <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral> /{' '}
          <Numeral koreanNumber>{monthlyRentFee}</Numeral>
        </PriceWrraper>
        {negotiable && <Negotiable>(협의가능)</Negotiable>}
      </Container>
    );
  }
  return (
    <Container>
      <PriceWrraper id="suggest-detail-price-field" css={[negotiable ? tw`[max-width: 274px]` : tw`w-full`]}>
        {describeJeonsaeWolsaeSame(BuyOrRent.Buy)} <Numeral koreanNumber>{tradeOrDepositPrice}</Numeral>
      </PriceWrraper>
      {negotiable && <Negotiable>(협의가능)</Negotiable>}
    </Container>
  );
}
