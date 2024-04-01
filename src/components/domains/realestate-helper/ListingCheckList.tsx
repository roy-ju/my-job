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

import MainDescription from './listing-check-list/MainDescription';

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
        list={middleCategoryList?.sort((a, b) => a.id - b.id).map((item) => ({ code: item.code, name: item.name }))}
        tab={tab}
        tabIndex={tabIndex}
        handleChangeTab={handleChangeTab}
      />
      <FlexContents>
        {middleCategoryList
          ?.sort((a, b) => a.id - b.id)
          .map((item) => (
            <MainDescription key={item.name} tab={tab} code={item.code} title={item.name} subTitle={item.content} />
          ))}
        <MarginTopSixteen />

        {middleCategoryList
          ?.sort((a, b) => a.id - b.id)
          .map((item) => (
            <List key={item.code} tab={tab} code={item.code} />
          ))}
      </FlexContents>
    </Container>
  );
}
