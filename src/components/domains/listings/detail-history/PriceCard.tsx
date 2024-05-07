import { Numeral } from '@/components/atoms';

import useMonthlyRentFee from './hooks/useMonthlyRentFee';

import { TextCenter, PriceCardWrraper, BorderBottomLine, PriceCardText } from './widget/ListingDetailHistoryWidget';

interface PriceCardProps {
  isMonthlyRent: boolean;
  tradeOrDepositPrice: number;
  monthlyRentFee: number;
  biddingTradeOrDepositPrice: number;
  biddingMonthlyRentFee: number;
}

export default function PriceCard({
  isMonthlyRent,
  tradeOrDepositPrice,
  monthlyRentFee,
  biddingMonthlyRentFee,
  biddingTradeOrDepositPrice,
}: PriceCardProps) {
  const { renderMonthlyRentFee } = useMonthlyRentFee();

  return (
    <PriceCardWrraper>
      <TextCenter>
        <PriceCardText>집주인 희망가</PriceCardText>
        {isMonthlyRent ? (
          <div>
            <Numeral thousandsSeparated koreanNumber tw="font-bold">
              {tradeOrDepositPrice}
            </Numeral>
            {' / '}
            {renderMonthlyRentFee(monthlyRentFee)}
          </div>
        ) : (
          <Numeral thousandsSeparated koreanNumber tw="font-bold">
            {tradeOrDepositPrice}
          </Numeral>
        )}
      </TextCenter>

      <BorderBottomLine />

      <TextCenter>
        <PriceCardText>나의 제안가</PriceCardText>
        {isMonthlyRent ? (
          <div>
            <Numeral thousandsSeparated koreanNumber tw="text-nego-800 font-bold">
              {biddingTradeOrDepositPrice}
            </Numeral>
            {' / '}
            {renderMonthlyRentFee(biddingMonthlyRentFee)}
          </div>
        ) : (
          <Numeral thousandsSeparated koreanNumber tw="text-nego-800 font-bold">
            {biddingTradeOrDepositPrice}
          </Numeral>
        )}
      </TextCenter>
    </PriceCardWrraper>
  );
}
