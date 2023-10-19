import useAPI_GetDanjisForTheLoggedIn from '@/apis/home/getDanjisForTheLoggedIn';
import useAPI_GetHomeDashboardInfo from '@/apis/home/getDashboard';
import useAPI_GetListingsForTheLoggedIn from '@/apis/home/getListingsForTheLoggedIn';
import useAPI_GetMostFavorites from '@/apis/home/getMostFavorites';
import useAPI_GetMostSuggests from '@/apis/home/getMostSuggests';
import useAPI_GetMostTradeCount from '@/apis/home/getMostTradeCount';
import useAPI_GetLawQna from '@/apis/lawQna/getLawQna';
import { addFavorite } from '@/apis/listing/addListingFavroite';
import { removeFavorite } from '@/apis/listing/removeListingFavorite';

import { Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { Home } from '@/components/templates';
import Paths from '@/constants/paths';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import useMap from '@/states/map';
import useSyncronizer from '@/states/syncronizer';
import { memo, useCallback, useState } from 'react';

export default memo(() => {
  const router = useRouter(0);
  const [openPopup, setOpenPopup] = useState(false);

  const map = useMap();

  const { user } = useAuth();

  const { data: tradeCoundData } = useAPI_GetMostTradeCount();

  const { data: suggestData } = useAPI_GetMostSuggests();

  const { data: favoriteData, mutate } = useAPI_GetMostFavorites();

  const { data: listingsForUserData, mutate: listingsForUserMutate } = useAPI_GetListingsForTheLoggedIn();

  const { data: danjisForUserData } = useAPI_GetDanjisForTheLoggedIn();

  const { data: homeDashboardData } = useAPI_GetHomeDashboardInfo();

  const { data: qnaLawData } = useAPI_GetLawQna(router?.query?.q ? (router.query.q as string) : null, 4);

  const { unreadNotificationCount } = useSyncronizer();

  const handleClickLogin = useCallback(() => {
    router.replace(Routes.Login);
  }, [router]);

  const handleClickNotification = useCallback(() => {
    router.replace(Routes.NotificationList);
  }, [router]);

  const handleClickSuggestion = useCallback(async () => {
    router.replace(Routes.RecommendGuide, {
      searchParams: {
        back: router.asPath,
      },
    });

    // router.replace(Routes.RecommendationForm, {
    //   searchParams: {
    //     back: router.asPath,
    //   },
    // });
  }, [router]);

  const handleClickBidding = useCallback(() => {
    router.replace(Routes.MapListingList);
    map.naverMap?.setZoom(13, true);
    window.Negocio.callbacks.selectListingHomeButton();
  }, [map.naverMap, router]);

  const handleClickHomeRegister = useCallback(() => {
    if (user?.hasAddress) {
      setOpenPopup(true);
      return;
    }
    router.replace(Routes.MyAddress, { searchParams: { origin: router.asPath } });
  }, [router, user?.hasAddress]);

  const handleClickLawQna = useCallback(
    (id?: number) => {
      router.replace(Routes.LawQnaDetail, { searchParams: { qnaID: `${id}` } });
    },
    [router],
  );

  const handleClickListing = useCallback(
    (listingID: number) => {
      router.replace(Routes.ListingDetail, { searchParams: { listingID: `${listingID}` } });
    },
    [router],
  );

  const handleClickDanji = useCallback(
    (danjiID: number) => {
      router.replace(Routes.DanjiDetail, { searchParams: { danjiID: `${danjiID}` } });
    },
    [router],
  );

  const favoriteMutate = useCallback(() => {
    mutate();
  }, [mutate]);

  const favoritelistingsForUserMutate = useCallback(() => {
    listingsForUserMutate();
  }, [listingsForUserMutate]);

  const handleClickAppStore = useCallback(() => {
    window.open(Paths.APP_STORE, '_blank');
  }, []);

  const handleClickGooglePlay = useCallback(() => {
    window.open(Paths.GOOGLE_PLAY_STORE, '_blank');
  }, []);

  const handleClickInstagram = useCallback(() => {
    window.open(Paths.INSTAGRAM, '_blank');
  }, []);

  const handleClickYoutube = useCallback(() => {
    window.open(Paths.YOUTUBE, '_blank');
  }, []);

  const handleClickNaverBlog = useCallback(() => {
    window.open(Paths.NAVER_BLOG, '_blank');
  }, []);

  const handleClickTermsAndPolicy = useCallback(() => {
    router.replace(Routes.TermsAndPolicy);
  }, [router]);

  const handleClickPrivacyPolicy = useCallback(() => {
    router.replace(Routes.PrivacyPolicy);
  }, [router]);

  const handleClickCounseling = useCallback(() => {
    router.replace(Routes.LawQna);
  }, [router]);

  const handleClickAgentSite = useCallback(() => {
    window.open(process.env.NEXT_PUBLIC_NEGOCIO_AGENT_CLIENT_URL, '_blank');
  }, []);

  const handleClickGuide = useCallback(() => {
    window.open(`${window.location.origin}/${Routes.Intro}`, '_blank');
  }, []);

  const handleClickFavoriteButton = async (selected: boolean, listingId: number) => {
    if (!user) {
      router.push(Routes.Login, {
        persistParams: true,
        searchParams: { redirect: `${router.asPath}`, back: 'true' },
      });
      return;
    }

    if (!user.isVerified) {
      router.push(Routes.VerifyCi, {
        persistParams: true,
        searchParams: { redirect: `${router.asPath}`, back: 'true' },
      });
      return;
    }

    if (!selected) {
      await removeFavorite(listingId);
      favoriteMutate?.();
    } else {
      await addFavorite(listingId);
      favoriteMutate?.();
    }
  };

  return (
    <Panel>
      <Home
        carouselType="pc"
        user={user}
        unreadNotificationCount={unreadNotificationCount}
        tradeCountList={tradeCoundData?.list}
        regionName={tradeCoundData?.region_name}
        mostSuggestList={suggestData?.list}
        mostFavoriteList={favoriteData?.list}
        listingsForUser={listingsForUserData?.list}
        danjisForUser={danjisForUserData?.list}
        hasAddress={danjisForUserData?.has_address}
        hasFavoriteDanji={danjisForUserData?.has_favorite_danji}
        activeListingCount={homeDashboardData?.active_listing_count}
        suggestAssignedAgentCount={homeDashboardData?.suggest_assigned_agent_count}
        qnaLawData={qnaLawData}
        onClickLogin={handleClickLogin}
        onClickNotification={handleClickNotification}
        onClickSuggestion={handleClickSuggestion}
        onClickBidding={handleClickBidding}
        onClickHomeRegister={handleClickHomeRegister}
        onClickListing={handleClickListing}
        onClickDanji={handleClickDanji}
        onClickAppStore={handleClickAppStore}
        onClickGooglePlay={handleClickGooglePlay}
        onClickInstagram={handleClickInstagram}
        onClickYoutube={handleClickYoutube}
        onClickNaverBlog={handleClickNaverBlog}
        onClickTermsAndPolicy={handleClickTermsAndPolicy}
        onClickPrivacyPolicy={handleClickPrivacyPolicy}
        onClickAgentSite={handleClickAgentSite}
        onClickGuide={handleClickGuide}
        onFavoritelistingsForUserMutate={favoritelistingsForUserMutate}
        onClickFavoriteButton={handleClickFavoriteButton}
        onClickCounseling={handleClickCounseling}
        onClickLawQna={handleClickLawQna}
      />

      {openPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.SubTitle tw="text-center">
                이미 등록된 주소가 있습니다.
                <br />
                우리집 추가는 마이페이지에서 가능합니다.
              </Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setOpenPopup(false)}>닫기</Popup.CancelButton>
              <Popup.ActionButton
                onClick={() => router.replace(Routes.My, { searchParams: { default: '2' }, persistParams: true })}
              >
                마이페이지 이동
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </Panel>
  );
});
