import { Loading, MobAuthRequired, MobileContainer } from '@/components/atoms';
import { memo, useState, useEffect, useCallback } from 'react';
import { MyParticipatingListings as MyParticipatingListingsTemplate } from '@/components/templates';
import { useRouter } from 'next/router';
import Routes from '@/router/routes';
import useMyParticipatingListings from './useMyParticipatingListings';

export default memo(() => {
  const router = useRouter();
  const { biddingStatus, isLoading } = useMyParticipatingListings();
  const [tab, setTab] = useState(Number(router.query.tab));

  useEffect(() => {
    if (router.query.tab) {
      setTab(Number(router.query.tab));
    }
  }, [router.query.tab]);

  const handleChangeListingTab = useCallback(
    (newValue: number) => {
      setTab(Number(newValue));
    },
    [setTab],
  );

  const handleClickListingItem = (listingID: number) => () => {
    router.push(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${listingID}`);
  };

  const handleNavigateToListingDetailHistory = (listingID: number, biddingID: number) => () => {
    router.push(`/${Routes.EntryMobile}/${Routes.ListingDetailHistory}?listingID=${listingID}&biddingID=${biddingID}`);
  };

  const handleClickBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace(`/${Routes.EntryMobile}/${Routes.My}`);
      }
    }
  }, [router]);

  return (
    <MobAuthRequired>
      <MobileContainer>
        {isLoading ? (
          <div tw="py-20">
            <Loading />
          </div>
        ) : (
          <MyParticipatingListingsTemplate
            tab={tab}
            onChangeListingTab={handleChangeListingTab}
            onClickListingItem={handleClickListingItem}
            onNavigateToListingDetailHistory={handleNavigateToListingDetailHistory}
            onClickBack={handleClickBack}
            biddingStatus={biddingStatus}
          />
        )}
      </MobileContainer>
    </MobAuthRequired>
  );
});
