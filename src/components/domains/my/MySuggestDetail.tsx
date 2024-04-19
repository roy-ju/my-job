import { useCallback, useMemo, useState } from 'react';

import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';

import tw, { styled } from 'twin.macro';

import { Loading } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

import StatusLabel from '@/components/organisms/suggest/StatusLabel';

import useFetchSuggestDetail from '@/services/suggests/useFetchSuggestDetail';

import useFetchMySuggestRecommends from '@/services/my/useFetchMySuggestRecommends';

import SeperatorV2 from '@/components/atoms/SeperatorV2';

import { SuggestStatus } from '@/constants/enums';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useCheckNotResource from '@/hooks/useCheckNotResource';

import { AnimatePresence } from 'framer-motion';

import useInactive from './suggest-detail/hooks/useInactive';

import useHandleClickBack from './suggest-detail/hooks/useHandleClickBack';

import InValidAccessPopup from './suggest-detail/popups/InValidAccessPopup';

import Summary from './suggest-detail/Summary';

import ListHeader from './suggest-detail/ListHeader';

import ListContents from './suggest-detail/ListContents';

import NotyetInterview from './suggest-detail/NotyetInterview';

import useMySuggestDetailHeaderHandler from './suggest-detail/hooks/useMySuggestDetailHeaderHandler';

const BottomSheetOverlayPresenter = dynamic(() => import('@/components/molecules/BottomSheetOverlayPresenter'), {
  ssr: false,
});

const SelectInterviewPopupsPc = dynamic(() => import('./suggest-detail/popups/SelectInterviewPopupPc'), { ssr: false });

const SelectInterviewBottomSheetMobile = dynamic(
  () => import('./suggest-detail/popups/SelectInterviewBottomSheetMobile'),
  { ssr: false },
);

const DeletePopup = dynamic(() => import('./suggest-detail/popups/DeletePopup'), { ssr: false });

const FlexContents = styled.div`
  ${tw`flex flex-col flex-1 h-full pt-6 overflow-y-auto`}
`;

const Container = styled.div`
  ${tw`flex flex-col w-full h-full`}
`;

const RecommendsListOrInterviewContainer = styled.div`
  ${tw`flex flex-col w-full px-5 pt-6`}
`;

const StatusLabelWrraper = styled.div`
  ${tw`px-5 mb-6`}
`;

const options = ['요청 수정', '요청 중단', '요청 취소'];

const options2 = ['요청 수정', '요청 재개', '요청 취소'];

export default function MySuggestDetail() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const [openSelectInterviewAvailableTimesPopup, setOpenSelectInterviewAvailableTimesPopup] = useState(false);

  const {
    data: suggestDetailData,
    mutate: mutateDetail,
    isLoading,
    error,
  } = useFetchSuggestDetail({
    suggestID: Number(router?.query?.suggestID) ?? 0,
  });

  const mySuggest = useMemo(() => suggestDetailData?.my_suggest, [suggestDetailData?.my_suggest]);

  const suggestID = useMemo(() => suggestDetailData?.suggest_id ?? 0, [suggestDetailData?.suggest_id]);

  const danjiID = useMemo(() => suggestDetailData?.danji_id ?? 0, [suggestDetailData?.danji_id]);

  const status = useMemo(() => {
    if (suggestDetailData?.suggest_complete_status) {
      return 'success';
    }

    if (suggestDetailData?.suggest_status === SuggestStatus.Stopped) {
      return 'stopped';
    }

    return '';
  }, [suggestDetailData]);

  const {
    isLoading: mySuggestRecommendsLoading,
    data: suggestRecommendsData,
    count,
    mutate: mutateList,
    increamentPageNumber,
  } = useFetchMySuggestRecommends(suggestID, undefined, mySuggest);

  const {
    handleClickSuggestUpdate,

    handleStopSuggest,
    handleResumeSuggest,

    deletePopup,
    handleOpenDeletePopup,
    handleCloseDeletePopup,
    handleDeleteMySuggest,
  } = useMySuggestDetailHeaderHandler({ suggestID, danjiID, mutate: mutateList, mutateDetail });

  const renderContents = useMemo(() => {
    if (!mySuggestRecommendsLoading && typeof count === 'number' && count > 0) {
      return 'recommendsList';
    }

    if (!isLoading && suggestDetailData && suggestDetailData.is_interviewed) {
      return 'recommendsList';
    }

    if (!isLoading && suggestDetailData && !suggestDetailData.is_interviewed) {
      return 'interviewSection';
    }

    return null;
  }, [count, isLoading, mySuggestRecommendsLoading, suggestDetailData]);

  const { showInactivePopup, inactivePopupCTA } = useInactive({ suggestDetailData });

  const { handleClickBack } = useHandleClickBack();

  useCheckNotResource({ error, message: '이미 취소된 요청 건입니다.' });

  const handleClickOptions = useCallback(
    (index: number) => {
      if (index === 0) {
        handleClickSuggestUpdate();
      }

      if (index === 1) {
        if (suggestDetailData?.suggest_status === SuggestStatus.Stopped) {
          handleResumeSuggest();
        } else {
          handleStopSuggest();
        }
      }

      if (index === 2) {
        handleOpenDeletePopup();
      }
    },
    [
      handleClickSuggestUpdate,
      handleOpenDeletePopup,
      handleResumeSuggest,
      handleStopSuggest,
      suggestDetailData?.suggest_status,
    ],
  );

  const handleOpenOrCloseSelectInterviewPopup = useCallback((v: boolean) => {
    setOpenSelectInterviewAvailableTimesPopup(v);
  }, []);

  if (isLoading || !suggestDetailData) {
    return (
      <div tw="w-full h-full flex flex-col py-20">
        <Loading />
      </div>
    );
  }

  if (showInactivePopup) {
    return <InValidAccessPopup handleConfirm={inactivePopupCTA} />;
  }

  if (suggestDetailData?.error_code) return null;

  return (
    <>
      <Container>
        <NavigationHeader>
          <NavigationHeader.BackButton onClick={handleClickBack} />
          <NavigationHeader.Title>구해요 상세</NavigationHeader.Title>
          <NavigationHeader.MoreButton
            type="text"
            text="관리"
            items={suggestDetailData?.suggest_status === SuggestStatus.Active ? options : options2}
            onClickItem={handleClickOptions}
          />
        </NavigationHeader>

        <FlexContents>
          {(status === 'stopped' || status === 'success') && (
            <StatusLabelWrraper>
              {status === 'success' ? (
                <StatusLabel render iconType="success" message="거래 성사가 완료되었습니다." />
              ) : (
                <StatusLabel render iconType="error" message="추천 요청이 중단된 상태입니다." />
              )}
            </StatusLabelWrraper>
          )}
          <Summary data={suggestDetailData} />

          <SeperatorV2 />

          {renderContents === 'recommendsList' && (
            <RecommendsListOrInterviewContainer>
              <ListHeader count={count} />
              <ListContents list={suggestRecommendsData} onNext={increamentPageNumber} mutate={mutateList} />
            </RecommendsListOrInterviewContainer>
          )}

          {renderContents === 'interviewSection' && (
            <RecommendsListOrInterviewContainer>
              <NotyetInterview
                suggestID={suggestDetailData.suggest_id}
                isQuickInterview={suggestDetailData.is_quick_interview}
                interviewAvaliableTimes={suggestDetailData.interview_available_times ?? ''}
                handleOpenOrCloseSelectInterviewPopup={handleOpenOrCloseSelectInterviewPopup}
                mutateSuggestDetail={mutateDetail}
              />
            </RecommendsListOrInterviewContainer>
          )}
        </FlexContents>
      </Container>

      {deletePopup && (
        <DeletePopup handleClickCancel={handleCloseDeletePopup} handleClickConfirm={handleDeleteMySuggest} />
      )}

      {openSelectInterviewAvailableTimesPopup && platform === 'pc' && (
        <SelectInterviewPopupsPc
          suggestID={suggestDetailData.suggest_id}
          interviewAvaliableTimes={suggestDetailData.interview_available_times ?? ''}
          handleOpenOrCloseSelectInterviewPopup={handleOpenOrCloseSelectInterviewPopup}
          mutateSuggestDetail={mutateDetail}
        />
      )}

      <AnimatePresence>
        {openSelectInterviewAvailableTimesPopup && platform === 'mobile' && (
          <BottomSheetOverlayPresenter handleClick={() => handleOpenOrCloseSelectInterviewPopup(false)}>
            <SelectInterviewBottomSheetMobile
              suggestID={suggestDetailData.suggest_id}
              interviewAvaliableTimes={suggestDetailData.interview_available_times ?? ''}
              handleOpenOrCloseSelectInterviewPopup={handleOpenOrCloseSelectInterviewPopup}
              mutateSuggestDetail={mutateDetail}
            />
          </BottomSheetOverlayPresenter>
        )}
      </AnimatePresence>
    </>
  );
}
