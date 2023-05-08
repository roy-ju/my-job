import useAPI_GetMyRealPriceList from '@/apis/my/getMyRealPriceList';
import { MobMyRealPriceList } from '@/components/templates';
import { useAuth } from '@/hooks/services';
import { useState, useMemo, useCallback } from 'react';

export default function RealPriceListWrraper() {
  const [buyOrRent, setBuyOrRent] = useState(0);
  const { updatedTime, data, isLoading, setSize, increamentPageNumber } = useAPI_GetMyRealPriceList(buyOrRent);
  const { user } = useAuth();

  const list = useMemo(
    () =>
      data.map((item) => ({
        danjiName: item?.danji_name,
        price: item?.price,
        monthlyRentFee: item?.monthly_rent_fee,
        createdTime: `${item?.deal_year}.${item?.deal_month}.${item?.deal_day}`,
        area: item?.jeonyong_area,
        buyOrRent: item?.buy_or_rent,
        dealType: item?.deal_type,
      })),
    [data],
  );

  const handleNextpage = useCallback(() => {
    if (data.length) {
      increamentPageNumber();
    }
  }, [increamentPageNumber, data]);

  const handleChangeBuyOrRent = useCallback(
    (newValue: number) => {
      setSize(1);
      setBuyOrRent(newValue);
    },
    [setSize],
  );

  return (
    <MobMyRealPriceList
      nickname={user?.nickname}
      isLoading={isLoading}
      key={buyOrRent}
      list={list}
      buyOrRent={buyOrRent}
      onChangeBuyOrRent={handleChangeBuyOrRent}
      onNext={handleNextpage}
      updatedTime={updatedTime ?? ''}
    />
  );
}
