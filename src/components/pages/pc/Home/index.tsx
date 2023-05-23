import useAPI_GetDanjisForTheLoggedIn from '@/apis/home/getDanjisForTheLoggedIn';
import useAPI_GetListingsForTheLoggedIn from '@/apis/home/getListingsForTheLoggedIn';
import useAPI_GetMostFavorites from '@/apis/home/getMostFavorites';
import useAPI_GetMostSuggests from '@/apis/home/getMostSuggests';
import useAPI_GetRecentRealPrices from '@/apis/home/getRecentRealPrices';
import useAPI_GetUnreadNotificationCount from '@/apis/notification/getUnreadNotificationCount';
import { Panel } from '@/components/atoms';
import { Home } from '@/components/templates';
import Paths from '@/constants/paths';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';

export default memo(() => {
  const router = useRouter(0);

  const { user } = useAuth();

  const { data: realPriceData } = useAPI_GetRecentRealPrices();

  const { data: suggestData } = useAPI_GetMostSuggests();

  const { data: favoriteData } = useAPI_GetMostFavorites();

  const { data: listingsForUserData } = useAPI_GetListingsForTheLoggedIn();

  const { data: danjisForUserData } = useAPI_GetDanjisForTheLoggedIn();

  const { count } = useAPI_GetUnreadNotificationCount();

  const handleClickLogin = useCallback(() => {
    router.replace(Routes.Login);
  }, [router]);

  const handleClickNotification = useCallback(() => {
    router.replace(Routes.NotificationList);
  }, [router]);

  const handleClickSuggestion = useCallback(() => {
    router.replace(Routes.SuggestRegionalForm);
  }, [router]);

  const handleClickBidding = useCallback(() => {
    router.replace(Routes.Map);
  }, [router]);

  const handleClickHomeRegister = useCallback(() => {
    router.replace(Routes.MyAddress);
  }, [router]);

  const handleClickListingCreate = useCallback(() => {
    router.replace(Routes.ListingCreateAddress, {
      searchParams: {
        origin: router.asPath,
      },
    });
  }, [router]);

  const handleClickListing = useCallback(
    (listingID: number) => {
      router.replace(Routes.ListingDetail, { searchParams: { listingID: `${listingID}` } });
    },
    [router],
  );

  const handleClickDanji = useCallback(
    (pnu: string, realestateType: number) => {
      router.replace(Routes.DanjiDetail, { searchParams: { p: pnu, rt: `${realestateType}` } });
    },
    [router],
  );

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

  const handleClickAgentSite = useCallback(() => {
    window.open(process.env.NEXT_PUBLIC_NEGOCIO_AGENT_CLIENT_URL, '_blank');
  }, []);

  return (
    <Panel>
      <Home
        user={user}
        unreadNotificationCount={count}
        recentRealPriceList={realPriceData?.list}
        mostSuggestList={suggestData?.list}
        mostFavoriteList={favoriteData?.list}
        listingsForUser={listingsForUserData?.list}
        danjisForUser={danjisForUserData?.list}
        onClickLogin={handleClickLogin}
        onClickNotification={handleClickNotification}
        onClickSuggestion={handleClickSuggestion}
        onClickBidding={handleClickBidding}
        onClickHomeRegister={handleClickHomeRegister}
        onClickListingCreate={handleClickListingCreate}
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
      />
    </Panel>
  );
});
