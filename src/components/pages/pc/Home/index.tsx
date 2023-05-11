import useAPI_GetMostFavorites from '@/apis/home/getMostFavorites';
import useAPI_GetMostSuggests from '@/apis/home/getMostSuggests';
import useAPI_GetRecentRealPrices from '@/apis/home/getRecentRealPrices';
import { Panel } from '@/components/atoms';
import { Home } from '@/components/templates';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import { memo, useCallback } from 'react';

export default memo(() => {
  const { user } = useAuth();
  const router = useRouter(0);

  const { data: realPriceData } = useAPI_GetRecentRealPrices();

  const { data: suggestData } = useAPI_GetMostSuggests();

  const { data: favoriteData } = useAPI_GetMostFavorites();

  const handleClickLogin = useCallback(() => {
    router.replace(Routes.Login);
  }, [router]);

  const handleClickSuggestion = useCallback(() => {
    router.replace(Routes.SuggestRegionalForm);
  }, [router]);

  const handleClickBidding = useCallback(() => {}, []);

  const handleClickHomeRegister = useCallback(() => {
    router.replace(Routes.MyAddress);
  }, [router]);

  const handleClickListingCreate = useCallback(() => {
    router.replace(Routes.ListingCreateAddress);
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

  return (
    <Panel>
      <Home
        loggedIn={Boolean(user)}
        recentRealPriceList={realPriceData?.list}
        mostSuggestList={suggestData?.list}
        mostFavoriteList={favoriteData?.list}
        onClickLogin={handleClickLogin}
        onClickSuggestion={handleClickSuggestion}
        onClickBidding={handleClickBidding}
        onClickHomeRegister={handleClickHomeRegister}
        onClickListingCreate={handleClickListingCreate}
        onClickListing={handleClickListing}
        onClickDanji={handleClickDanji}
      />
    </Panel>
  );
});
