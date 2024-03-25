import Container from '@/components/atoms/Container';

import FlexContents from '@/components/atoms/FlexContents';

import { MarginTopTwenty } from '@/components/atoms/Margin';

import { NavigationHeader } from '@/components/molecules';

import useFetchSubHomeDashboardInfo from '@/services/sub-home/useFetchSubHomeDashboardInfo';

import useHandleClickBack from './sub-home/hooks/useHandleClickBack';

import useNavigationHandler from './sub-home/hooks/useNavigationHandler';

import Preview from './sub-home/Preview';

import Process from './sub-home/Process';

import Required from './sub-home/Required';

import CommonSense from './sub-home/CommonSense';

import Dict from './sub-home/Dict';

import { LastVirtualDiv, Seperator } from './sub-home/widget/SubHomeWidget';

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
        <CommonSense list={list1} handleNavigateCommonSense={() => handleNavigateSubPage(makeUrl('commonSense'))} />
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
