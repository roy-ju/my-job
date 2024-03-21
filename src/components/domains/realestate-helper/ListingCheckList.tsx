import { useEffect, useState } from 'react';

import Loading from '@/components/atoms/Loading';

import LoadingContainer from '@/components/atoms/LoadingContainer';

import Container from '@/components/atoms/Container';

import { MarginTopSixteen } from '@/components/atoms/Margin';

import { NavigationHeader } from '@/components/molecules';

import useFetchSubHomeGuideList from '@/services/sub-home/useFetchSubHomeGuideList';

import FlexContents from '@/components/atoms/FlexContents';

import { apiService } from '@/services';

import CategoryTabs from './listing-check-list/CategoryTabs';

import useHandleClickBack from './listing-check-list/hooks/useHandleClickBack';

import useCategoryTabs from './listing-check-list/hooks/useCategoryTabs';

import List from './listing-check-list/List';

import { ListType } from './listing-check-list/types';

export default function ListingCheckList() {
  const { handleClickBack } = useHandleClickBack();

  const { tab, tabIndex, handleChangeTab } = useCategoryTabs();

  const { middleCategoryList, isLoading } = useFetchSubHomeGuideList({ code: 'CHEC' });

  const [list, setList] = useState<ListType>([]);

  useEffect(() => {
    async function fetchData({ code }: { code: string }) {
      const response = await apiService.getListingCheckList({ code });

      const requiredListWithChecked = response?.required_list.map((item) => ({ ...item, checked: false })) ?? [];

      return { code, additionalList: response?.additional_list ?? [], requiredList: requiredListWithChecked };
    }

    async function fetchAllData() {
      if (middleCategoryList && middleCategoryList.length > 0) {
        const dataList = await Promise.all(middleCategoryList.map((item) => fetchData({ code: item.code })));

        setList(dataList);
      }
    }

    fetchAllData();
  }, [middleCategoryList]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>매물 체크리스트</NavigationHeader.Title>
      </NavigationHeader>

      <CategoryTabs
        list={middleCategoryList?.map((item) => ({ code: item.code, name: item.name }))}
        tab={tab}
        tabIndex={tabIndex}
        handleChangeTab={handleChangeTab}
      />
      <MarginTopSixteen />
      <FlexContents>
        <List list={list.filter((item) => item.code === tab)} tab={tab} />
      </FlexContents>
    </Container>
  );
}
