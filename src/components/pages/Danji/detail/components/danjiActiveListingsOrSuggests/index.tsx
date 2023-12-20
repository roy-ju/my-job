import { useCallback, useEffect, useMemo, useState } from 'react';

import { usePopupDisaptchStore } from '@/providers/PopupProvider';

import { useFetchNaverDanji } from '@/services/danji/useFetchNaverDanji';

import { useFetchDanjiListingsList } from '@/services/danji/useFetchDanjiListingsList';

import { useFetchDanjiSuggestLists } from '@/services/danji/useFetchDanjiSuggestLists';

import useAuth, { User } from '@/hooks/services/useAuth';

import { apiService } from '@/services';

import { isExistedItems } from '@/utils/isExistedItems';

import { DanjiListingsListItem, DanjiSuggestListItem } from '@/services/danji/types';

import { sliceList } from '@/utils/sliceList';

import useAuthRedirect from '@/hooks/utils/useAuthRedirect';

import useCheckRecommendationService from '../../hooks/useCheckRecommendationService';

import useDanjiDetailStore from '../../hooks/useDanjiDetailStore';

import SuggestsOrListingsTab from './SuggestsOrListingsTab';

import Messages from './Messages';

import ViewAllButtons from './ViewAllButtons';

import RegisterButtons from './RegisterButtons';

import ListingDetailOpertionsButtons from './ListingDetailOpertionsButtons';

import { getSuggestOrListings } from '../../utils';

import useDanjiActiveListingsOrSuggestsHandler from '../../hooks/useDanjiActiveListingsOrSuggestsHandler';
import FixedButton from './FixedButton';
import ListingItemList from './ListingItemList';

export default function DanjiActiveListingsOrSuggests({
  tabIndex,
  isListingDetail = false,
}: {
  tabIndex?: number;
  isListingDetail?: boolean;
}) {
  const [tab, setTab] = useState(1);

  const { user: userData } = useAuth();

  const { handleLogin, handleVerified } = useAuthRedirect();

  const store = useDanjiDetailStore();

  const { isPossibleSuggestService } = useCheckRecommendationService();

  const popupDispatch = usePopupDisaptchStore();

  const {
    handleRouterSuggestListAll,
    handleRouterSuggestDetail,
    handleRouterListingAll,
    handleRouterListingDetail,
    handleRouterCreateSuggest,
    handleRouterOpenNaverRealestate,
    handleRouterSelectAddress,
  } = useDanjiActiveListingsOrSuggestsHandler();

  const { mobileNaverURL } = useFetchNaverDanji({ id: store?.danji?.danji_id });

  const { data: listings, totalCount: listingTotalCount } = useFetchDanjiListingsList({
    danjiId: store?.danji?.danji_id,
    realestateType: store?.danji?.type,
    orderBy: 1,
    pageSize: 4,
  });

  const {
    data: suggestList,
    totalCount: suggestTotalCount,
    mutate,
  } = useFetchDanjiSuggestLists({
    danjiId: store?.danji?.danji_id,
    pageSize: 4,
  });

  const isExistedListings = useMemo(() => isExistedItems<DanjiListingsListItem>(listings), [listings]);

  const isExistedSuggest = useMemo(() => isExistedItems<DanjiSuggestListItem>(suggestList), [suggestList]);

  const type = useMemo(() => getSuggestOrListings(tab), [tab]);

  const suggestListings = useMemo(() => {
    if (isExistedSuggest) return sliceList<DanjiSuggestListItem>(0, 3, suggestList);

    return [];
  }, [isExistedSuggest, suggestList]);

  const danjiListings = useMemo(() => {
    if (isExistedListings) return sliceList<DanjiListingsListItem>(0, 3, listings);

    return [];
  }, [isExistedListings, listings]);

  const isRenderMessage = useMemo(
    () => (type === 'suggest' ? isExistedSuggest : isExistedListings),
    [type, isExistedListings, isExistedSuggest],
  );

  const isRenderViewOrButtons = useMemo(
    () => (type === 'suggest' ? suggestTotalCount > 3 : listingTotalCount > 3),
    [type, listingTotalCount, suggestTotalCount],
  );

  const renderType = useMemo(() => {
    if (type === 'suggest') {
      return isExistedSuggest ? 'list' : 'noData';
    }

    return isExistedListings ? 'list' : 'noData';
  }, [isExistedListings, isExistedSuggest, type]);

  const list = useMemo(() => {
    if (type === 'suggest') {
      return suggestListings;
    }

    return danjiListings;
  }, [danjiListings, suggestListings, type]);

  const handleCreateListing = useCallback(
    async (user: Nullable<User>, danjiID: number) => {
      if (!user) {
        handleLogin();
        return;
      }

      if (!user.isVerified) {
        handleVerified();
        return;
      }

      if (!user?.hasAddress) {
        popupDispatch?.('verificationAddress');
        return;
      }

      if (user?.hasAddress) {
        const res = await apiService.listingEligibilityCheck({ id: danjiID });
        if (res && !res?.is_eligible) {
          popupDispatch?.('needMoreVerificationAddress');
          return;
        }

        if (res && res?.is_eligible) {
          handleRouterSelectAddress(danjiID);
        }
      }
    },
    [handleLogin, handleRouterSelectAddress, handleVerified, popupDispatch],
  );

  const handleCreateSuggest = useCallback(
    (danjiID: number, isPossible: boolean) => {
      if (isPossible) {
        popupDispatch?.('');
        handleRouterCreateSuggest(danjiID);
      } else {
        popupDispatch?.('impossibleRecommendation');
      }
    },
    [handleRouterCreateSuggest, popupDispatch],
  );

  const handleChangeTab = useCallback((v: number) => {
    setTab(v);
  }, []);

  const handleClickRegister = useCallback(() => {
    if (!store?.danji?.danji_id) return;

    const danjiID = store.danji.danji_id;

    if (type === 'suggest') {
      handleCreateSuggest(danjiID, isPossibleSuggestService);
    } else {
      handleCreateListing(userData, danjiID);
    }
  }, [store, type, userData, isPossibleSuggestService, handleCreateListing, handleCreateSuggest]);

  const handleClickViewOrButtons = useCallback(() => {
    if (!store?.danji?.danji_id) return;

    const danjiID = store.danji.danji_id;
    if (type === 'suggest') {
      handleRouterSuggestListAll(danjiID);
    } else {
      handleRouterListingAll(danjiID);
    }
  }, [handleRouterSuggestListAll, handleRouterListingAll, store, type]);

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (!store?.danji) return null;

  if (isListingDetail && listings?.length > 0)
    return (
      <ListingDetailOpertionsButtons
        listingTotalCount={listingTotalCount}
        naverRealestateUrl={mobileNaverURL}
        handleClickViewAll={handleRouterListingAll}
        handleOpenNaverRealestate={handleRouterOpenNaverRealestate}
      />
    );

  return (
    <>
      <div tw="pb-10">
        <SuggestsOrListingsTab
          tab={tab}
          listingTotalCount={listingTotalCount}
          suggestTotalCount={suggestTotalCount}
          handleChangeTab={handleChangeTab}
        />

        <div>
          <div tw="flex pt-7 px-5 items-center justify-between">
            <Messages type={getSuggestOrListings(tab)} isRender={isRenderMessage} />
            <ViewAllButtons
              type={getSuggestOrListings(tab)}
              isRender={isRenderViewOrButtons}
              onClickViewAllButtons={handleClickViewOrButtons}
            />
          </div>

          <ListingItemList
            type={getSuggestOrListings(tab)}
            renderType={renderType}
            list={list}
            handleRouterSuggestDetail={handleRouterSuggestDetail}
            handleRouterListingDetail={handleRouterListingDetail}
          />
        </div>

        <RegisterButtons
          type={getSuggestOrListings(tab)}
          naverRealestateUrl={mobileNaverURL}
          onClickRegister={handleClickRegister}
          handleOpenNaverRealestate={handleRouterOpenNaverRealestate}
        />
      </div>

      <FixedButton
        tabIndex={tabIndex}
        isPossible={isPossibleSuggestService}
        handleCreateListing={handleCreateListing}
        handleCreateSuggest={handleCreateSuggest}
      />
    </>
  );
}
