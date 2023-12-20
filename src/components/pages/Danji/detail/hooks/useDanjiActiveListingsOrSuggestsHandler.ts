import { useCallback } from 'react';

import { useRouter } from 'next/router';

import Routes from '@/router/routes';

export default function useDanjiActiveListingsOrSuggestsHandler() {
  const router = useRouter();

  const handleRouterSuggestListAll = useCallback(
    (danjiID: number) => {
      router.push(`/${Routes.EntryMobile}/${Routes.SuggestListings}?danjiID=${danjiID}`);
    },
    [router],
  );

  const handleRouterSuggestDetail = useCallback(
    (danjiID: number, suggestID: number, mySuggest: boolean) => {
      if (mySuggest) {
        router.push(`/${Routes.EntryMobile}/${Routes.MySuggestDetail}?danjiID=${danjiID}&suggestID=${suggestID}`);
        return;
      }

      router.push(`/${Routes.EntryMobile}/${Routes.SuggestDetail}?danjiID=${danjiID}&suggestID=${suggestID}`);
    },
    [router],
  );

  const handleRouterListingAll = useCallback(
    (danjiID: number) => {
      router.push(`/${Routes.EntryMobile}/${Routes.DanjiListings}?danjiID=${danjiID}`);
    },
    [router],
  );

  const handleRouterListingDetail = useCallback(
    (danjiID: number, listingID: number, buyOrRent: number) => {
      router.push(
        {
          pathname: `/${Routes.EntryMobile}/${Routes.ListingDetail}`,
          query: {
            listingID: `${listingID}`,
            danjiID,
            bor: `${buyOrRent}`,
          },
        },
        `/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${listingID}&danjiID=${danjiID}`,
      );
    },
    [router],
  );

  const handleRouterCreateSuggest = useCallback(
    (danjiID: number) => {
      const redirectURL = `/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${danjiID}`;

      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.DanjiRecommendation}`,
        query: {
          ...(danjiID ? { danjiID } : {}),
          entry: 'danji',
          redirect: redirectURL,
          origin: router.asPath,
        },
      });
    },
    [router],
  );

  const handleRouterOpenNaverRealestate = (url?: string) => {
    if (url) {
      window.open(url);
    }
  };

  const handleRouterSelectAddress = useCallback(
    (danjiID: number) => {
      router.push({
        pathname: `/${Routes.EntryMobile}/${Routes.ListingSelectAddress}`,
        query: {
          origin: router.asPath,
          ...(danjiID ? { danjiID: danjiID.toString() } : {}),
        },
      });
    },
    [router],
  );

  return {
    handleRouterSuggestListAll,
    handleRouterSuggestDetail,
    handleRouterListingAll,
    handleRouterListingDetail,
    handleRouterCreateSuggest,
    handleRouterOpenNaverRealestate,
    handleRouterSelectAddress,
  };
}
