import { Numeral } from '@/components/atoms';

export default function Price({
  tradeOrDepositPrice,
  monthlyRentFee,
  quickSale,
}: {
  tradeOrDepositPrice: number;
  monthlyRentFee: number;
  quickSale: boolean;
}) {
  if (quickSale) return <>&nbsp;급매물 구해요</>;

  if (monthlyRentFee) {
    return (
      <>
        &nbsp;<Numeral koreanNumber>{tradeOrDepositPrice}</Numeral> / <Numeral koreanNumber>{monthlyRentFee}</Numeral>
      </>
    );
  }
  return (
    <>
      &nbsp;<Numeral koreanNumber>{tradeOrDepositPrice}</Numeral>
    </>
  );
}
