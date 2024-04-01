import tw, { styled } from 'twin.macro';

import Container from '@/components/atoms/Container';

import LoadingContainer from '@/components/atoms/LoadingContainer';

import Loading from '@/components/atoms/Loading';

import { NavigationHeader } from '@/components/molecules';

import useFetchSubHomeGuideList from '@/services/sub-home/useFetchSubHomeGuideList';

import useIosWebkitNoneApplySafeArea from '@/hooks/useIosWebkitNoneApplySafeArea';

import useHandleClickBack from './dictionary/hooks/useHandleClickBack';

import useRecentlyGoClickedElement from './dictionary/hooks/useRecentlyGoClickedElement';

import CategoryTabs from './dictionary/CategoryTabs';

import DictContents from './dictionary/DictContents';

import BottomRefElement from './dictionary/BottomRefElement';

import { DictionaryContainerElementId } from './dictionary/constants/element_id';

const FlexContents = styled.div`
  ${tw`relative flex flex-col flex-1 min-h-0 gap-5 px-5 pt-5 overflow-x-hidden overflow-y-auto`}
`;

export default function Dictionary() {
  const { handleClickBack } = useHandleClickBack();

  const { isLoading, middleCategoryList, list } = useFetchSubHomeGuideList({ code: 'DICT' });

  useRecentlyGoClickedElement();

  useIosWebkitNoneApplySafeArea();

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

      <CategoryTabs list={list} middleCategoryList={middleCategoryList} />

      <FlexContents id={DictionaryContainerElementId}>
        {list.map((item) => (
          <DictContents key={item.name} item={item} />
        ))}
        <BottomRefElement />
      </FlexContents>
    </Container>
  );
}
