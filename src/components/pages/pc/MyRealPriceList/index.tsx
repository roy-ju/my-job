import useAPI_GetMyRealPriceList from '@/apis/my/getMyRealPriceList';
import { Panel } from '@/components/atoms';
import { MyRealPriceList } from '@/components/templates';
import { memo, useCallback, useMemo, useState } from 'react';
import useAuth from '@/hooks/services/useAuth';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);

  const [buyOrRent, setBuyOrRent] = useState(0);

  const [sortBy, setSortBy] = useState('업데이트 순');

  const { updatedTime, data, isLoading, setSize, increamentPageNumber } = useAPI_GetMyRealPriceList(
    buyOrRent,
    sortBy === '업데이트 순' ? 1 : 2,
  );

  const { user } = useAuth();

  const list = useMemo(
    () =>
      data.map((item) => ({
        danjiName: item?.danji_name,
        danjiID: item?.danji_id,
        price: item?.price,
        monthlyRentFee: item?.monthly_rent_fee,
        createdTime: `${item?.deal_year}.${item?.deal_month}.${item?.deal_day}`,
        area: item?.jeonyong_area,
        buyOrRent: item?.buy_or_rent,
        dealType: item?.deal_type,
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
    <Panel width={panelWidth}>
      <MyRealPriceList
        isLoading={isLoading}
        list={list}
        sortBy={sortBy}
        onChagneSortBy={handleChangeSortBy}
        nickname={user?.nickname ?? ''}
        buyOrRent={buyOrRent}
        onChangeBuyOrRent={handleChangeBuyOrRent}
        onNext={handleNextpage}
        updatedTime={updatedTime ?? ''}
        onClickItem={(danjiID, realestateType, bor) =>
          router.push(Routes.DanjiDetail, {
            searchParams: {
              danjiID: `${danjiID}`,
            },
            state: {
              bor: bor.toString(),
            },
          })
        }
      />
    </Panel>
  );
});
