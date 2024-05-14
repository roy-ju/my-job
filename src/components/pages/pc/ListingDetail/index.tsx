import { memo } from 'react';

import dynamic from 'next/dynamic';

import LoadingContainer from '@/components/atoms/LoadingContainer';

import { Loading, Panel } from '@/components/atoms';

import { OverlayPresenter } from '@/components/molecules';

import { SharePopup } from '@/components/organisms';

import { ListingDetail } from '@/components/templates';

import ErrorCodes from '@/constants/error_codes';

import { ListingDetailResponse } from '@/services/listing/types';

import useFetchListingDetail from '@/services/listing/useFetchListingDetail';

import useFetchListingStatus from '@/services/listing/useFetchListingStatus';

import useFetchQnaList from '@/services/qna/useFetchQnaList';

import useFetchListingRealestateDocumentSummary from '@/services/listing/useFetchListingRealestateDocumentSummary';

import useListingDetailRedirectorPc from '../../ListingDetail/hooks/useListingDetailRedirectorPc';

import useListingDetailPc from '../../ListingDetail/hooks/useListingDetailPc';

import useFavroriteHandler from '../../ListingDetail/hooks/useFavroriteHandler';

import useShareHandler from '../../ListingDetail/hooks/useShareHandler';

import useQnasHandler from '../../ListingDetail/hooks/useQnasHandler';

import useSuggestHandler from '../../ListingDetail/hooks/useSuggestHandler';

import useMoreButtonHandler from '../../ListingDetail/hooks/useMoreButtonHandler';

import useListingViewPc from '../../ListingDetail/hooks/useListingViewPc';

import useWindowCallbacksSelectMarkerPc from '../../ListingDetail/hooks/useWindowCallbacksSelectMarkerPc';

const SuggestAcceptRecommendPopup = dynamic(() => import('../../ListingDetail/popups/SuggestAcceptRecommendPopup'), {
  ssr: false,
});

const SuggestNotInterestedPopup = dynamic(() => import('../../ListingDetail/popups/SuggestNotInterestedPopup'), {
  ssr: false,
});

const InvalidAccessPopup = dynamic(() => import('@/components/organisms/popups/InvalidAccessPopup'), { ssr: false });

interface Props {
  depth: number;
  listingID: number;
  panelWidth?: string;
  ipAddress?: string;
}

export default memo(({ depth, panelWidth, listingID, ipAddress }: Props) => {
  const { redirectable } = useListingDetailRedirectorPc(listingID);

  const { data: statusData, isLoading: isLoadingStatus } = useFetchListingStatus(listingID);

  const { data, mutate: mutateListing, isLoading } = useFetchListingDetail(statusData?.can_access ? listingID : 0);

  const { data: realestateDocumentData } = useFetchListingRealestateDocumentSummary(
    statusData?.can_access ? listingID : 0,
  );

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

    routerPop,
    handleClickBack,
  } = useListingDetailPc({
    data,
    listingID: data?.listing?.id ?? 0,
  });

  useListingViewPc({ listingID, ipAddress: ipAddress !== '::1' ? ipAddress ?? '' : '', statusData });

  useWindowCallbacksSelectMarkerPc({ data });

  const { handleClickFavorite } = useFavroriteHandler({ data, mutateListing });

  const { isPopupButtonLoading, handleSuggestAcceptRecommend, handleSuggestNotInterested } = useSuggestHandler({
    data,
    mutateListing,
    handleClosePopup,
  });

  const { handleClickMoreItem } = useMoreButtonHandler({ data });

  const { handleCopyUrl, handleShareViaKakao } = useShareHandler({ data, handleClosePopup });

  const { handleNavigateToCreateQna, handleClickDeleteQna } = useQnasHandler({
    listingID: data?.listing?.id ?? 0,
    mutateQnas,
  });

  if (isLoading || isLoadingStatus || redirectable) {
    return (
      <Panel width={panelWidth}>
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      </Panel>
    );
  }

  if (statusData?.error_code === ErrorCodes.LISTING_DOES_NOT_EXIST) {
    return <InvalidAccessPopup handleConfirm={routerPop} />;
  }

  return (
    <Panel width={panelWidth}>
      <ListingDetail
        depth={depth}
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
    </Panel>
  );
});
