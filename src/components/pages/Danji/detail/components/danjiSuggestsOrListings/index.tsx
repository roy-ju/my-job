/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useEffect, useMemo } from 'react';

import { useFetchNaverDanji } from '@/services/danji/useFetchNaverDanji';

import { useFetchDanjiListingsList } from '@/services/danji/useFetchDanjiListingsList';

import { useFetchDanjiSuggestsList } from '@/services/danji/useFetchDanjiSuggestsList';

import { usePopupDisaptchStore } from '@/providers/PopupProvider';

import { apiService } from '@/services';

import useAuth from '@/hooks/services/useAuth';

import useAuthRedirect from '@/hooks/utils/useAuthRedirect';

import ListingDetailOpertionsButtons from './ListingDetailOpertionsButtons';

import SuggestsOrListingsTab from './SuggestsOrListingsTab';

import Messages from './Messages';

import ViewAllButtons from './ViewAllButtons';

import RegisterButtons from './RegisterButtons';

import ListingItemList from './ListingItemList';

import FixedButton from './FixedButton';

import useDanjiDetailStore from '../../hooks/useDanjiDetailStore';

import useDanjiSuggestsOrListingsStore from '../../hooks/useDanjiSuggestsOrListingsStore';

import useDanjiSuggestsOrListingsDispatch from '../../hooks/useDanjiSuggestsOrListingsDispatch';

import useCheckRecommendationService from '../../hooks/useCheckRecommendationService';

import useDanjiActiveListingsOrSuggestsHandler from '../../hooks/useDanjiActiveListingsOrSuggestsHandler';
import FetchController from './FetchController';
import useInit from '../../hooks/useInit';

export default function DanjiSuggestsOrListings({
  tabIndex,
  isListingDetail = false,
}: {
  tabIndex?: number;
  isListingDetail?: boolean;
}) {
  const store = useDanjiDetailStore();

  const danjiSuggestsOrListingsStore = useDanjiSuggestsOrListingsStore();

  const dispatch = useDanjiSuggestsOrListingsDispatch();

  const danjiID = store?.danji?.danji_id ?? 0;

  const realestateType = store?.danji?.type;

  const possible = danjiSuggestsOrListingsStore?.recommendationService?.possible;

  // const listingsListData = useFetchDanjiListingsList({
  //   danjiID,
  //   realestateType,
  //   orderBy: 1,
  //   pageSize: 4,
  // });

  const { user: userData } = useAuth();

  const { handleLogin, handleVerified } = useAuthRedirect();

  const popupDispatch = usePopupDisaptchStore();

  const {
    handleRouterSuggestListAll,
    handleRouterSuggestDetail,
    handleRouterListingAll,
    handleRouterListingDetail,
    handleRouterCreateSuggest,
    handleRouterSelectAddress,
  } = useDanjiActiveListingsOrSuggestsHandler();

  const handleClickCreateListing = useCallback(async () => {
    if (!userData) {
      handleLogin();
      return;
    }

    if (!userData.isVerified) {
      handleVerified();
      return;
    }

    if (!userData?.hasAddress) {
      popupDispatch?.('verificationAddress');
      return;
    }

    if (userData?.hasAddress) {
      const res = await apiService.listingEligibilityCheck({ id: danjiID });
      if (res && !res?.is_eligible) {
        popupDispatch?.('needMoreVerificationAddress');
        return;
      }

      if (res && res?.is_eligible) {
        handleRouterSelectAddress(danjiID);
      }
    }
  }, [danjiID, handleLogin, handleRouterSelectAddress, handleVerified, popupDispatch, userData]);

  const handleClickCreateSuggest = useCallback(() => {
    if (possible) {
      popupDispatch?.('');
      handleRouterCreateSuggest(danjiID);
      return;
    }

    popupDispatch?.('impossibleRecommendation');
  }, [danjiID, handleRouterCreateSuggest, popupDispatch, possible]);

  const handleClickViewAllSuggests = useCallback(() => {
    if (!danjiID) return;

    handleRouterSuggestListAll(danjiID);
  }, [danjiID, handleRouterSuggestListAll]);

  const handleClickViewAllListings = useCallback(() => {
    if (!danjiID) return;

    handleRouterListingAll(danjiID);
  }, [danjiID, handleRouterListingAll]);

  // useEffect(() => {
  //   mutate();
  // }, [mutate]);

  // useEffect(() => {
  //   dispatch?.({ type: 'set_data', payLoad: collectionDatas });
  // }, [collectionDatas, dispatch]);

  if (!store?.danji) return null;

  if (isListingDetail && danjiSuggestsOrListingsStore.listingsList.data.length > 0)
    return (
      <ListingDetailOpertionsButtons
        listingTotalCount={danjiSuggestsOrListingsStore.listingsList.totalCount}
        handleClickListingsButton={handleClickViewAllListings}
      />
    );

  return (
    <>
      <div tw="pb-10">
        <SuggestsOrListingsTab />

        <div>
          <div tw="flex pt-7 px-5 items-center justify-between">
            <Messages />
            <ViewAllButtons
              handleClickSuggestsButton={handleClickViewAllSuggests}
              handleClickListingsButton={handleClickViewAllListings}
            />
          </div>

          <ListingItemList
            handleClickSuggestItem={handleRouterSuggestDetail}
            handleClickListingItem={handleRouterListingDetail}
          />
        </div>

        <RegisterButtons
          handleClickListingButton={handleClickCreateListing}
          handleClickSuggestButton={handleClickCreateSuggest}
        />
      </div>

      <FixedButton
        tabIndex={tabIndex}
        handleClickListingButton={handleClickCreateListing}
        handleClickSuggestButton={handleClickCreateSuggest}
      />
    </>
  );
}
