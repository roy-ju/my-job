import { useCallback } from 'react';

import tw, { styled } from 'twin.macro';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import useAuth from '@/hooks/services/useAuth';

import useFetchMyRealPriceList from '@/services/my/useFetchMyRealpriceList';

import useIosWebkitNoneApplySafeArea from '@/hooks/useIosWebkitNoneApplySafeArea';

import ContentsTop from './interested-realprice-list/ContentsTop';

import RealpriceListTap from './interested-realprice-list/FilterBuyOrRent';

import SortUpdatedTimeOrTradeDate from './interested-realprice-list/SortUpdatedTimeOrTradeDate';

import RealpriceList from './interested-realprice-list/RealpriceList';

import Nodata from './interested-realprice-list/Nodata';

import useFilters from './interested-realprice-list/hooks/useFilters';

import useHandleClickBack from './interested-realprice-list/hooks/useHandleClickBack';

const FlexContents = styled.div`
  ${tw`flex flex-col flex-1 min-h-0 px-5 pt-6`}
`;

export default function MyInterestedRealpriceList() {
  const { user } = useAuth();

  const { buyOrRent, sortBy, handleChangeBuyOrRent: onChagneBuyOrRent, handleChangeSortBy } = useFilters();

  const { updatedTime, list, isLoading, setSize, increamentPageNumber } = useFetchMyRealPriceList(
    buyOrRent,
    sortBy === '업데이트 순' ? 1 : 2,
  );

  const { handleClickBack } = useHandleClickBack();

  const onNext = useCallback(() => {
    if (list.length) {
      setTimeout(() => {
        increamentPageNumber();
      }, 1000);
    }
  }, [increamentPageNumber, list]);

  const handleChangeBuyOrRent = useCallback(
    (newValue: number) => {
      setSize(1);
      onChagneBuyOrRent(newValue);
    },
    [onChagneBuyOrRent, setSize],
  );

  useIosWebkitNoneApplySafeArea();

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>관심 실거래가</NavigationHeader.Title>
      </NavigationHeader>

      <FlexContents>
        <ContentsTop nickname={user?.nickname ?? ''} time={updatedTime} />
        <RealpriceListTap value={buyOrRent} handleChange={handleChangeBuyOrRent} />
        <SortUpdatedTimeOrTradeDate value={sortBy} handleChange={handleChangeSortBy} />
        {!isLoading && !updatedTime && <Nodata />}
        <RealpriceList isLoading={isLoading} list={list} onNext={onNext} />
      </FlexContents>
    </Container>
  );
}
