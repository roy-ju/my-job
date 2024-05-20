import { memo, useEffect } from 'react';

import dynamic from 'next/dynamic';

import { useRouter } from 'next/router';

import LoadingContainer from '@/components/atoms/LoadingContainer';

import { Loading, MobileContainer } from '@/components/atoms';

import { OverlayPresenter } from '@/components/molecules';

import { SharePopup } from '@/components/organisms';

import { MobListingDetail } from '@/components/templates';

import FullScreenMap from '@/components/templates/MobDanjiDetail/Components/FullScreenMap';

import DanjiAroundDetail from '@/components/templates/MobDanjiDetail/Components/DanjiAroundDetail';

import DanjiSchoolDetail from '@/components/templates/MobDanjiDetail/Components/DanjiSchoolDetail';

import ErrorCodes from '@/constants/error_codes';

import { ListingDetailResponse } from '@/services/listing/types';

import useDanjiDetailMobile from '@/components/domains/danji/hooks/useDanjiDetailMobile';

import useMobileDanjiInteraction from '@/states/hooks/useMobileDanjiInteraction';

import useMobileDanjiMap from '@/states/hooks/useMobileDanjiMap';

import useFetchListingDetail from '@/services/listing/useFetchListingDetail';

import useFetchListingStatus from '@/services/listing/useFetchListingStatus';

import useFetchQnaList from '@/services/qna/useFetchQnaList';

import useFetchListingRealestateDocumentSummary from '@/services/listing/useFetchListingRealestateDocumentSummary';

import useListingDetailRedirectorMobile from '../../ListingDetail/hooks/useListingDetailRedirectorMobile';

import useListingDetailMobile from '../../ListingDetail/hooks/useListingDetailMobile';

import useFavroriteHandler from '../../ListingDetail/hooks/useFavroriteHandler';

import useShareHandler from '../../ListingDetail/hooks/useShareHandler';

import useQnasHandler from '../../ListingDetail/hooks/useQnasHandler';

import useSuggestHandler from '../../ListingDetail/hooks/useSuggestHandler';

import useMoreButtonHandler from '../../ListingDetail/hooks/useMoreButtonHandler';

import useListingViewMobile from '../../ListingDetail/hooks/useListingViewMobile';

const SuggestAcceptRecommendPopup = dynamic(() => import('../../ListingDetail/popups/SuggestAcceptRecommendPopup'), {
  ssr: false,
});

const SuggestNotInterestedPopup = dynamic(() => import('../../ListingDetail/popups/SuggestNotInterestedPopup'), {
  ssr: false,
});

const InvalidAccessPopup = dynamic(() => import('@/components/organisms/popups/InvalidAccessPopup'), { ssr: false });

export default memo(() => {
  const router = useRouter();

  const listingID = Number(router.query.listingID) ?? 0;

  const { redirectable } = useListingDetailRedirectorMobile(listingID);

  const { data: statusData, isLoading: isLoadingStatus } = useFetchListingStatus(listingID);

  const { data, mutate: mutateListing, isLoading } = useFetchListingDetail(statusData?.can_access ? listingID : 0);

  const { data: realestateDocumentData } = useFetchListingRealestateDocumentSummary(
    statusData?.can_access ? listingID : 0,
  );

  const {
    danjiAroundData,
    isTrue,
    isTrueSchool,
    isTrueAround,
    makeFalse,
    makeFalseAround,
    makeFalseSchool,
    makeBindDanji,
  } = useMobileDanjiInteraction();

  const { mapType, makeGeneralMap } = useMobileDanjiMap();

  const { danji } = useDanjiDetailMobile(data?.listing?.danji_id);

  const {
    data: qnaData,
    hasNext: hasMoreQnas,
    increamentPageNumber: loadMoreQnas,
    mutate: mutateQnas,
  } = useFetchQnaList(statusData?.can_access ? listingID : 0);

  const {
    popup,

    handleNavigateToParticipateBidding,
    handleNavigateToUpdateTargetPrice,
    handleNavigateToUpdateBidding,
    handleNavigateToChatRoom,
    handleNavigateToPhotoGallery,
    handleNavigateToSuggestForm,
    handleNavigateToListingDetailHistory,

    handleOpenPopup,
    handleClosePopup,

    handleClickBack,
    handleClickBackIfInvalidAccess,
  } = useListingDetailMobile({ data, listingID });

  useListingViewMobile({ statusData, listingID: data?.listing?.id ?? 0 });

  const { handleClickFavorite } = useFavroriteHandler({ data, mutateListing });

  const { handleNavigateToCreateQna, handleClickDeleteQna } = useQnasHandler({ listingID, mutateQnas });

  const { isPopupButtonLoading, handleSuggestAcceptRecommend, handleSuggestNotInterested } = useSuggestHandler({
    data,
    mutateListing,
    handleClosePopup,
  });

  const { handleClickMoreItem } = useMoreButtonHandler({ data });

  const { handleCopyUrl, handleShareViaKakao } = useShareHandler({ data, handleClosePopup });

  useEffect(
    () => () => {
      makeFalse();
      makeFalseAround();
      makeFalseSchool();
      makeGeneralMap();
      makeBindDanji(undefined);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (isLoading || isLoadingStatus || redirectable) {
    return (
      <MobileContainer>
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      </MobileContainer>
    );
  }

  if (statusData?.error_code === ErrorCodes.LISTING_DOES_NOT_EXIST) {
    return <InvalidAccessPopup handleConfirm={handleClickBackIfInvalidAccess} />;
  }

  return (
    <>
      {!isTrue && !isTrueAround && !isTrueSchool && (
        <>
          <MobileContainer>
            <MobListingDetail
              listingDetail={data as ListingDetailResponse}
              qnaList={qnaData}
              isLoading={isLoading || isLoadingStatus}
              hasMoreQnas={hasMoreQnas}
              realestateDocumentData={realestateDocumentData}
              onClickBack={handleClickBack}
              onClickMoreItem={handleClickMoreItem}
              onClickFavorite={handleClickFavorite}
              onClickLoadMoreQna={loadMoreQnas}
              onClickDeleteQna={handleClickDeleteQna}
              onNavigateToParticipateBidding={handleNavigateToParticipateBidding}
              onNavigateToUpdateTargetPrice={handleNavigateToUpdateTargetPrice}
              onNavigateToUpdateBidding={handleNavigateToUpdateBidding}
              onNavigateToChatRoom={handleNavigateToChatRoom}
              onNavigateToCreateQna={handleNavigateToCreateQna}
              onNavigateToPhotoGallery={handleNavigateToPhotoGallery}
              onNavigateToSuggestForm={handleNavigateToSuggestForm}
              onNavigateToListingDetailHistory={handleNavigateToListingDetailHistory}
              onClickShare={() => handleOpenPopup('share')}
              onClickSuggestAcceptRecommend={() => handleOpenPopup('suggestAcceptRecommend')}
              onClickSuggestNotInterested={() => handleOpenPopup('suggestNotInterested')}
            />
            {popup === 'suggestNotInterested' && (
              <SuggestNotInterestedPopup
                isLoading={isPopupButtonLoading}
                handleConfirm={handleSuggestNotInterested}
                handleCancel={handleClosePopup}
              />
            )}

            {popup === 'suggestAcceptRecommend' && (
              <SuggestAcceptRecommendPopup
                isLoading={isPopupButtonLoading}
                handleConfirm={handleSuggestAcceptRecommend}
                handleCancel={handleClosePopup}
              />
            )}

            {popup === 'share' && (
              <OverlayPresenter>
                <SharePopup
                  onClickShareViaKakao={handleShareViaKakao}
                  onClickCopyUrl={handleCopyUrl}
                  onClickOutside={handleClosePopup}
                />
              </OverlayPresenter>
            )}
          </MobileContainer>
        </>
      )}

      {isTrue && (
        <MobileContainer>
          <FullScreenMap danji={danji} type={mapType} />
        </MobileContainer>
      )}

      {isTrueAround && (
        <MobileContainer>
          <DanjiAroundDetail danji={danjiAroundData} />
        </MobileContainer>
      )}

      {isTrueSchool && (
        <MobileContainer>
          <DanjiSchoolDetail lat={danji?.lat} lng={danji?.long} rt={danji?.type} danjiID={danji?.danji_id} />
        </MobileContainer>
      )}
    </>
  );
});
