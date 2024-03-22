import { useCallback } from 'react';

import tw, { styled } from 'twin.macro';

import Container from '@/components/atoms/Container';

import { NavigationHeader } from '@/components/molecules';

import useIosWebkitNoneApplySafeArea from '@/hooks/useIosWebkitNoneApplySafeArea';

import useWindowOpen from '@/hooks/useWindowOpen';

import useFetchSubHomeGuideList from '@/services/sub-home/useFetchSubHomeGuideList';

import CardList from './common-sense/CardList';

import useHandleClickBack from './common-sense/hooks/useHandleClickBack';

const FlexContents = styled.div`
  ${tw`flex flex-col flex-1 min-h-0 pb-5 overflow-y-auto`}
`;

export default function CommonSense() {
  const { handleClickBack } = useHandleClickBack();

  const { openWindowWithLink } = useWindowOpen();

  const { list } = useFetchSubHomeGuideList({ code: 'KNOW' });

  useIosWebkitNoneApplySafeArea();

  const onClickItem = useCallback(
    (link: string) => {
      openWindowWithLink(link);
    },
    [openWindowWithLink],
  );

  return (
    <Container>
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={handleClickBack} />
        <NavigationHeader.Title>부동산 상식</NavigationHeader.Title>
      </NavigationHeader>
      <FlexContents>
        <CardList list={list} handleClickItem={onClickItem} />
      </FlexContents>
    </Container>
  );
}
