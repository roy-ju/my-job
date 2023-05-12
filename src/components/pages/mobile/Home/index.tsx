import { MobileContainer } from '@/components/atoms';
import { MobGlobalNavigation } from '@/components/organisms';

import useAPI_GetDanjisForTheLoggedIn from '@/apis/home/getDanjisForTheLoggedIn';
import useAPI_GetListingsForTheLoggedIn from '@/apis/home/getListingsForTheLoggedIn';
import useAPI_GetMostFavorites from '@/apis/home/getMostFavorites';
import useAPI_GetMostSuggests from '@/apis/home/getMostSuggests';
import useAPI_GetRecentRealPrices from '@/apis/home/getRecentRealPrices';
import useAPI_GetUnreadNotificationCount from '@/apis/notification/getUnreadNotificationCount';

import { Home as HomeTemplate } from '@/components/templates';
import Paths from '@/constants/paths';
import { useAuth } from '@/hooks/services';

import Routes from '@/router/routes';
import { useCallback } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const { user } = useAuth();

  const { count: unreadNotificationCount } = useAPI_GetUnreadNotificationCount();

  const { data: realPriceData } = useAPI_GetRecentRealPrices();

  const { data: suggestData } = useAPI_GetMostSuggests();

  const { data: favoriteData } = useAPI_GetMostFavorites();

  const { data: listingsForUserData } = useAPI_GetListingsForTheLoggedIn();

  const { data: danjisForUserData } = useAPI_GetDanjisForTheLoggedIn();

  const handleClickLogin = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.Login}`);
  }, [router]);

  const handleClickNotification = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.NotificationList}`);
  }, [router]);

  const handleClickSuggestion = useCallback(() => {}, []);

  const handleClickBidding = useCallback(() => {}, []);

  const handleClickHomeRegister = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.MyAddress}`);
  }, [router]);

  const handleClickListingCreate = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/${Routes.ListingCreateAddress}`);
  }, [router]);

  const handleClickListing = useCallback(
    (listingID: number) => {
      router.push(
        { pathname: `/${Routes.EntryMobile}/${Routes.ListingDetail}`, query: { listingID: `${listingID}` } },
        `/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${listingID}`,
      );
    },
    [router],
  );

  const handleClickDanji = useCallback(
    (pnu: string, realestateType: number) => {
      router.push(
        {
          pathname: `/${Routes.EntryMobile}/${Routes.DanjiDetail}`,
          query: { p: pnu, rt: `${realestateType}` },
        },
        `/${Routes.EntryMobile}/${Routes.DanjiDetail}?p=${pnu}&rt=${realestateType}`,
      );
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
    <MobileContainer bottomNav={<MobGlobalNavigation index={0} />}>
      <HomeTemplate
        user={user}
        unreadNotificationCount={unreadNotificationCount}
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
    </MobileContainer>
  );
}
