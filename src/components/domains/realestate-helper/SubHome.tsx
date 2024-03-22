import Container from '@/components/atoms/Container';

import FlexContents from '@/components/atoms/FlexContents';

import { MarginTopTwenty } from '@/components/atoms/Margin';

import { NavigationHeader } from '@/components/molecules';

import useFetchSubHomeDashboardInfo from '@/services/sub-home/useFetchSubHomeDashboardInfo';

import useHandleClickBack from './sub-home/hooks/useHandleClickBack';

import useNavigationHandler from './sub-home/hooks/useNavigationHandler';

import Process from './sub-home/Process';

import Required from './sub-home/Required';

import CommonSense from './sub-home/CommonSense';

import Dict from './sub-home/Dict';

export default function SubHome() {
  const { renderBackButton, handleClickBack } = useHandleClickBack();

  const { handleNavigateSubPage, makeUrl, handleNavigateDictDetail } = useNavigationHandler();

  const { isLoading, list1, list2 } = useFetchSubHomeDashboardInfo();

  if (isLoading) return null;

  return (
    <Container>
      <NavigationHeader>
        {renderBackButton && <NavigationHeader.BackButton onClick={handleClickBack} />}
        <NavigationHeader.Title>부동산 거래 도우미</NavigationHeader.Title>
      </NavigationHeader>
      <FlexContents>
        <Process handleClick={() => handleNavigateSubPage(makeUrl('tradeProcess'))} />
        <MarginTopTwenty />
        <Required
          handleNavigateDeungibu={() => handleNavigateSubPage(makeUrl('documentList'))}
          handleNavigateCheckList={() => handleNavigateSubPage(makeUrl('listingCheckList'))}
          handleNavigateSpecialTerms={() => handleNavigateSubPage(makeUrl('specialTerms'))}
        />
        <MarginTopTwenty />
        <CommonSense list={list1} handleNavigateCommonSense={() => handleNavigateSubPage(makeUrl('commonSense'))} />
        <MarginTopTwenty />
        <Dict
          list={list2}
          handleNavigateDict={() => handleNavigateSubPage(makeUrl('dict'))}
          handleNavigateDictDetail={handleNavigateDictDetail}
        />
      </FlexContents>
    </Container>
  );
}
