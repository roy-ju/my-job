import useAPI_GetMyRealPriceList from '@/apis/my/getMyRealPriceList';
import MobMyRealPriceList from '@/components/templates/MobMyRealPriceList';
import { NextPageWithLayout } from '@/pages/_app';
import { useState, useMemo, useCallback } from 'react';

function MobMyRealPriceListWrraper() {
  const [buyOrRent, setBuyOrRent] = useState(0);
  const { updatedTime, data, isLoading, setSize, increamentPageNumber } = useAPI_GetMyRealPriceList(buyOrRent);

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

const Page: NextPageWithLayout = () => <MobMyRealPriceListWrraper />;

Page.getLayout = function getLayout(page) {
  return (
    <>
      <div tw="w-[100%] absolute bg-nego-1300 h-full [z-index: -1]" />
      {page}
    </>
  );
};

export default Page;
