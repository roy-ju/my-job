import { Numeral } from '@/components/atoms';

export default function useMonthlyRentFee() {
  const renderMonthlyRentFee = (fee: number) => {
    if (fee === 0) return '0원';
    return (
      <Numeral thousandsSeparated koreanNumber>
        {fee}
      </Numeral>
    );
  };

  return { renderMonthlyRentFee };
}
