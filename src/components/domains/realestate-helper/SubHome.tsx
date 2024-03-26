import Container from '@/components/atoms/Container';

import FlexContents from '@/components/atoms/FlexContents';

import { MarginTopTwenty } from '@/components/atoms/Margin';

import useFetchSubHomeDashboardInfo from '@/services/sub-home/useFetchSubHomeDashboardInfo';

import useNavigationHandler from './sub-home/hooks/useNavigationHandler';

import Header from './sub-home/Header';

import Preview from './sub-home/Preview';

import Process from './sub-home/Process';

import Required from './sub-home/Required';

import CommonSense from './sub-home/CommonSense';

import Dict from './sub-home/Dict';

import { LastVirtualDiv, Seperator } from './sub-home/widget/SubHomeWidget';

export default function SubHome() {
  const { handleNavigateSubPage, makeUrl, handleNavigateDictDetail, handleNavigateCommonSenseDetail } =
    useNavigationHandler();

  const { isLoading, list1, list2 } = useFetchSubHomeDashboardInfo();

  if (isLoading) return null;

  return (
    <Container>
      <Header />
      <FlexContents>
        <Preview
          handleNavigateTradeProcess={() => handleNavigateSubPage(makeUrl('tradeProcess'))}
          handleNavigateDeungibu={() => handleNavigateSubPage(makeUrl('documentList'))}
          handleNavigateCheckList={() => handleNavigateSubPage(makeUrl('listingCheckList'))}
          handleNavigateSpecialTerms={() => handleNavigateSubPage(makeUrl('specialTerms'))}
          handleNavigateCommonSense={() => handleNavigateSubPage(makeUrl('commonSense'))}
          handleNavigateDict={() => handleNavigateSubPage(makeUrl('dict'))}
        />
        <MarginTopTwenty />
        <Process handleClick={() => handleNavigateSubPage(makeUrl('tradeProcess'))} />
        <Seperator />
        <Required
          handleNavigateDeungibu={() => handleNavigateSubPage(makeUrl('documentList'))}
          handleNavigateCheckList={() => handleNavigateSubPage(makeUrl('listingCheckList'))}
          handleNavigateSpecialTerms={() => handleNavigateSubPage(makeUrl('specialTerms'))}
        />
        <Seperator />
        <CommonSense
          list={list1}
          handleNavigateCommonSense={() => handleNavigateSubPage(makeUrl('commonSense'))}
          handleNavigateCommonSenseDetail={handleNavigateCommonSenseDetail}
        />
        <Seperator />
        <Dict
          list={list2}
          handleNavigateDict={() => handleNavigateSubPage(makeUrl('dict'))}
          handleNavigateDictDetail={handleNavigateDictDetail}
        />
        <LastVirtualDiv />
      </FlexContents>
    </Container>
  );
}
