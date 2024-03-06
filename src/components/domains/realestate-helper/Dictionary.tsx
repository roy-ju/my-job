import tw, { styled } from 'twin.macro';

import Container from '@/components/atoms/Container';

import LoadingContainer from '@/components/atoms/LoadingContainer';

import Loading from '@/components/atoms/Loading';

import { NavigationHeader } from '@/components/molecules';

import useFetchSubHomeGuideList from '@/services/sub-home/useFetchSubHomeGuideList';

import useHandleClickBack from './dictionary/hooks/useHandleClickBack';

import FilterTabs from './dictionary/FilterTabs';

import DictContents from './dictionary/DictContents';

import useFilterTabs from './dictionary/hooks/useFilterTabs';

const FlexContents = styled.div`
  ${tw`relative flex flex-col flex-1 h-full gap-5 px-5 pb-5 overflow-x-hidden overflow-y-auto`}
`;

export default function Dictionary() {
  const { handleClickBack } = useHandleClickBack();

  const { tab, tabIndex, handleChangeTab } = useFilterTabs();

  const { isLoading, middleCategoryList, list } = useFetchSubHomeGuideList({ code: 'DICT' });

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
        <NavigationHeader.Title>부동산 용어 사전</NavigationHeader.Title>
      </NavigationHeader>
      <FilterTabs tab={tab} tabIndex={tabIndex} handleChangeTab={handleChangeTab} list={middleCategoryList} />

      <FlexContents>
        {list.map((item) => (
          <DictContents key={item.name} item={item} />
        ))}
      </FlexContents>
    </Container>
  );
}
