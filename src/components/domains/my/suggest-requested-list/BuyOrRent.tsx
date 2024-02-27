import { useMemo } from 'react';

import { BuyOrRent as BuyOrRentEnum } from '@/constants/enums';

export default function BuyOrRent({ buyOrRents }: { buyOrRents?: string }) {
  const buyOrRentText = useMemo(() => (Number(buyOrRents) === BuyOrRentEnum.Buy ? '매매 ' : '전월세 '), [buyOrRents]);

  return <span>{buyOrRentText}</span>;
}
