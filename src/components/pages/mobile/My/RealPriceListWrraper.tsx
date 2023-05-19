import useAPI_GetUnreadChatCount from '@/apis/chat/getUnreadNotificationCount';
import useAPI_GetMyRealPriceList from '@/apis/my/getMyRealPriceList';
import { MobileContainer } from '@/components/atoms';
import { MobMyRealPriceList } from '@/components/templates';
import { useAuth } from '@/hooks/services';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useState, useMemo, useCallback } from 'react';

export default function RealPriceListWrraper() {
  const router = useRouter();
  const [buyOrRent, setBuyOrRent] = useState(0);
  const [sortBy, setSortBy] = useState('업데이트 순');
  const { updatedTime, data, isLoading, setSize, increamentPageNumber } = useAPI_GetMyRealPriceList(
    buyOrRent,
    sortBy === '업데이트 순' ? 1 : 2,
  );
  const { user } = useAuth();
  const { count: unreadChatCount } = useAPI_GetUnreadChatCount();

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
        pnu: item?.pnu,
        realestateType: item?.realestate_type,
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

  const handleChangeSortBy = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  return (
    <MobileContainer>
      <MobMyRealPriceList
        nickname={user?.nickname}
        isLoading={isLoading}
        list={list}
        unreadChatCount={unreadChatCount}
        sortBy={sortBy}
        onChagneSortBy={handleChangeSortBy}
        buyOrRent={buyOrRent}
        onChangeBuyOrRent={handleChangeBuyOrRent}
        onClickBack={() => router.back()}
        onNext={handleNextpage}
        updatedTime={updatedTime ?? ''}
        onClickItem={(pnu, realestateType) => {
          router.push(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?p=${pnu}&rt=${realestateType}`);
        }}
      />
    </MobileContainer>
  );
}
