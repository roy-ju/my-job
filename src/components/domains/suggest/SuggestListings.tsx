import { useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import tw, { styled } from 'twin.macro';

import SeperatorV2 from '@/components/atoms/SeperatorV2';

import { NavigationHeader } from '@/components/molecules';

import DanjiInfo from '@/components/organisms/danji/DanjiInfo';

import useIosWebkitNoneApplySafeArea from '@/hooks/useIosWebkitNoneApplySafeArea';

import { useFetchDanjiDetail } from '@/services/danji/useFetchDanjiDetail';

import { useFetchDanjiSuggestsList } from '@/services/danji/useFetchDanjiSuggestsList';

import useHandleClickBack from './listings-list/hooks/useHandleClickBack';

import useCheckPossibleSuggest from './listings-list/hooks/useCheckPossibleSuggest';

import useMutateSuggestListCallback from './listings-list/hooks/useMutateSuggestListCallback';

import useListItemHandler from './listings-list/hooks/useListItemHandler';

import useCtasHandler from './listings-list/hooks/useCtasHandler';

import ListHeader from './listings-list/ListHeader';

import List from './listings-list/List';

import Nodata from './listings-list/Nodata';

import Ctas from './listings-list/Ctas';

import ImpossibleRecommendationPopup from './listings-list/popups/ImpossibleRecommendationPopup';

const Container = styled.div`
  ${tw`relative flex flex-col w-full h-full`}
`;

const Seperator = styled.div`
  ${tw`h-4`}
`;

const DanjiInfoWrraper = styled.div`
  ${tw`py-6`}
`;

const DanjiSuggestListingsWrraper = styled.div`
  ${tw`flex-1 overflow-y-auto`}
`;

export default function SuggestListings() {
  const router = useRouter();

  const danjiID = router?.query?.danjiID ? Number(router.query.danjiID) : 0;

  const { data: danjiData, isLoading } = useFetchDanjiDetail({ danjiID });

  const {
    data: danjiSuggestList,
    setSize,
    mutate,
  } = useFetchDanjiSuggestsList({
    danjiID: danjiData?.danji_id,
    pageSize: 10,
  });

  const suggestList = useMemo(() => {
    if (!danjiSuggestList) return [];

    return danjiSuggestList
      ?.map((item) => item?.list)
      .filter((item) => Boolean(item))
      .flat();
  }, [danjiSuggestList]);

  const suggestListTotalCount = useMemo(
    () => (danjiSuggestList ? (danjiSuggestList[0] ? danjiSuggestList[0].total_count : 0) : 0),
    [danjiSuggestList],
  );

  const increamentPageNumber = useCallback(() => {
    setSize((prev) => prev + 1);
  }, [setSize]);

  const { renderBackButtonUi, handleClickBack } = useHandleClickBack();

  const { isRecommendationService } = useCheckPossibleSuggest({ danji: danjiData });

  const {
    impossibleRecommendationPopup,
    handleClickDanjiDetailButton,
    handleClickCreateSuggestButton,
    handleCloseImpossibleRecommendationPopup,
  } = useCtasHandler({
    isRecommendable: isRecommendationService,
    danjiID,
  });

  useMutateSuggestListCallback({ mutateCallback: mutate });

  const { handleClickItem } = useListItemHandler({ danjiID });

  useIosWebkitNoneApplySafeArea();

  if (isLoading || !danjiData) return null;

  if (danjiData?.error_code) return null;

  return (
    <>
      <Container>
        <NavigationHeader>
          {renderBackButtonUi && <NavigationHeader.BackButton onClick={handleClickBack} />}
          <NavigationHeader.Title>단지 내 구해요 목록</NavigationHeader.Title>
        </NavigationHeader>
        <DanjiInfoWrraper>
          <DanjiInfo danji={danjiData} handleClick={handleClickDanjiDetailButton} />
        </DanjiInfoWrraper>
        <DanjiSuggestListingsWrraper>
          <SeperatorV2 />
          <SeperatorV2 tw="h-6 bg-transparent" />
          {suggestList && suggestList.length === 0 && <Nodata />}
          {suggestList && suggestList.length > 0 && (
            <>
              <ListHeader count={suggestListTotalCount} />
              <Seperator />
              <List list={suggestList} onNext={increamentPageNumber} handleClickItem={handleClickItem} />
            </>
          )}
        </DanjiSuggestListingsWrraper>

        <Ctas handleClickCta={handleClickCreateSuggestButton} />

        {impossibleRecommendationPopup && (
          <ImpossibleRecommendationPopup handleClickConfirm={handleCloseImpossibleRecommendationPopup} />
        )}
      </Container>
    </>
  );
}
