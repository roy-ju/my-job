import { useEffect, useState } from 'react';

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

import { DictElementListItem } from './dictionary/type';

const FlexContents = styled.div`
  ${tw`relative flex flex-col flex-1 min-h-0 gap-5 px-5 overflow-x-hidden overflow-y-auto`}
`;

export default function Dictionary() {
  const [elementsList, setElementsList] = useState<DictElementListItem[]>([]);

  const { handleClickBack } = useHandleClickBack();

  const { tab, tabIndex, handleChangeTab } = useFilterTabs({ elementsList });

  const { isLoading, middleCategoryList, list } = useFetchSubHomeGuideList({ code: 'DICT' });

  useEffect(() => {
    list?.forEach((i, idx) => {
      const item = document.getElementById(`negocio-dict-list-${i.name}`);

      if (item) {
        setElementsList((prev) => [...prev, { name: i.name, element: item, priority: idx + 1 }]);
      }
    });
  }, [list]);

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
      <FlexContents id="negocio-dictionary-scrollable-container">
        {list.map((item) => (
          <DictContents key={item.name} item={item} />
        ))}
        {/* <div id="negocio-dictionary-bottom" tw="[min-height: 1px] [min-width: 100%]" /> */}
      </FlexContents>
    </Container>
  );
}
