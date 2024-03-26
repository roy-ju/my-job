import { useEffect, useState } from 'react';

import tw, { styled } from 'twin.macro';

import Container from '@/components/atoms/Container';

import LoadingContainer from '@/components/atoms/LoadingContainer';

import Loading from '@/components/atoms/Loading';

import { NavigationHeader } from '@/components/molecules';

import useFetchSubHomeGuideList from '@/services/sub-home/useFetchSubHomeGuideList';

import useRecentlyClickedElementId from '@/states/hooks/useRecentlyClickedElementId';

import useIosWebkitNoneApplySafeArea from '@/hooks/useIosWebkitNoneApplySafeArea';

import useHandleClickBack from './dictionary/hooks/useHandleClickBack';

import CategoryTabs from './dictionary/CategoryTabs';

import DictContents from './dictionary/DictContents';

import useCategoryTabs from './dictionary/hooks/useCategoryTabs';

import { DictElementListItem } from './dictionary/types';

import {
  DictionaryBottomElementId,
  DictionaryContainerElementId,
  PrefixListElementItemId,
} from './dictionary/constants/element_id';

const FlexContents = styled.div`
  ${tw`relative flex flex-col flex-1 min-h-0 gap-5 px-5 overflow-x-hidden overflow-y-auto`}
`;

export default function Dictionary() {
  const [elementsList, setElementsList] = useState<DictElementListItem[]>([]);

  const { handleClickBack } = useHandleClickBack();

  const { recenltyClickedElementID, handleResetRecentlyClickedElementId } = useRecentlyClickedElementId();

  const { tab, tabIndex, handleChangeTab } = useCategoryTabs({ elementsList });

  const { isLoading, middleCategoryList, list } = useFetchSubHomeGuideList({ code: 'DICT' });

  useEffect(() => {
    list?.forEach((i, idx) => {
      const item = document.getElementById(`${PrefixListElementItemId}-${i.name}`);

      if (item) {
        setElementsList((prev) => [...prev, { name: i.name, element: item, priority: idx + 1 }]);
      }
    });
  }, [list]);

  useEffect(() => {
    if (recenltyClickedElementID) {
      const element = document.getElementById(recenltyClickedElementID);

      setTimeout(() => {
        element?.scrollIntoView();

        setTimeout(() => {
          handleResetRecentlyClickedElementId();
        }, 200);
      });
    }
  }, [handleResetRecentlyClickedElementId, recenltyClickedElementID]);

  useIosWebkitNoneApplySafeArea();

  console.log('render');

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

      <CategoryTabs tab={tab} tabIndex={tabIndex} handleChangeTab={handleChangeTab} list={middleCategoryList} />

      <FlexContents id={DictionaryContainerElementId}>
        {list.map((item) => (
          <DictContents key={item.name} item={item} />
        ))}
        <div id={DictionaryBottomElementId} tw="[min-height: 10px] [min-width: 100%]" />
      </FlexContents>
    </Container>
  );
}
