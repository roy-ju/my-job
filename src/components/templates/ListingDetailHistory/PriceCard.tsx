import { Numeral } from '@/components/atoms';

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
  const renderMonthlyRentFee = (fee: number) => {
    if (fee === 0) return '0원';
    return (
      <Numeral thousandsSeparated koreanNumber>
        {fee}
      </Numeral>
    );
  };

  return (
    <div tw="pt-4 flex justify-evenly">
      <div tw="text-center">
        <div tw="text-gray-700 text-info">집주인 희망가</div>
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
      </div>
      <div tw="h-11 border-l border-gray-300 mx-5" />
      <div tw="text-center">
        <div tw="text-gray-700 text-info">나의 제안가</div>
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
      </div>
    </div>
  );
}
