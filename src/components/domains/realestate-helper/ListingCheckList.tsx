import Loading from '@/components/atoms/Loading';

import LoadingContainer from '@/components/atoms/LoadingContainer';

import Container from '@/components/atoms/Container';

import { MarginTopSixteen } from '@/components/atoms/Margin';

import { NavigationHeader } from '@/components/molecules';

import useFetchSubHomeGuideList from '@/services/sub-home/useFetchSubHomeGuideList';

import FlexContents from '@/components/atoms/FlexContents';

import CategoryTabs from './listing-check-list/CategoryTabs';

import useHandleClickBack from './listing-check-list/hooks/useHandleClickBack';

import useCategoryTabs from './listing-check-list/hooks/useCategoryTabs';

import List from './listing-check-list/List';

export default function ListingCheckList() {
  const { handleClickBack } = useHandleClickBack();

  const { tab, tabIndex, handleChangeTab } = useCategoryTabs();

  const { middleCategoryList, isLoading } = useFetchSubHomeGuideList({ code: 'CHEC' });

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
        {middleCategoryList.map((item) => (
          <List key={item.code} tab={tab} code={item.code} />
        ))}
      </FlexContents>
    </Container>
  );
}
