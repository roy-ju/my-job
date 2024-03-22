import Container from '@/components/atoms/Container';

import FlexContents from '@/components/atoms/FlexContents';

import { MarginTopTwenty } from '@/components/atoms/Margin';

import { NavigationHeader } from '@/components/molecules';

import useFetchSubHomeDashboardInfo from '@/services/sub-home/useFetchSubHomeDashboardInfo';

import SeperatorV2 from '@/components/atoms/SeperatorV2';
import useHandleClickBack from './sub-home/hooks/useHandleClickBack';

import useNavigationHandler from './sub-home/hooks/useNavigationHandler';

import Preview from './sub-home/Preview';

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

        <SeperatorV2 tw="[min-height: 12px] h-3 mb-5" />

        <Required
          handleNavigateDeungibu={() => handleNavigateSubPage(makeUrl('documentList'))}
          handleNavigateCheckList={() => handleNavigateSubPage(makeUrl('listingCheckList'))}
          handleNavigateSpecialTerms={() => handleNavigateSubPage(makeUrl('specialTerms'))}
        />

        <SeperatorV2 tw="[min-height: 12px] h-3 my-5" />

        <CommonSense list={list1} handleNavigateCommonSense={() => handleNavigateSubPage(makeUrl('commonSense'))} />

        <SeperatorV2 tw="[min-height: 12px] h-3 my-5" />

        <Dict
          list={list2}
          handleNavigateDict={() => handleNavigateSubPage(makeUrl('dict'))}
          handleNavigateDictDetail={handleNavigateDictDetail}
        />

        <div tw="[min-height: 20px]" />
      </FlexContents>
    </Container>
  );
}
