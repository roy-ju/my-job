import { memo, useState, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';

import { Loading, MobAuthRequired, MobileContainer } from '@/components/atoms';

import { MyParticipatingListings as MyParticipatingListingsTemplate } from '@/components/templates';

import Routes from '@/router/routes';

import useMyParticipatingListings from './useMyParticipatingListings';

export default memo(() => {
  const router = useRouter();

  const { biddingStatus, isLoading } = useMyParticipatingListings();

  const [tab, setTab] = useState(Number(router.query.tab));

  const handleChangeListingTab = useCallback(
    (newValue: number) => {
      setTab(Number(newValue));
    },
    [setTab],
  );

  const handleNavigateToListingDetailHistory = useCallback(
    (listingID: number, biddingID: number) => () => {
      router.push(
        `/${Routes.EntryMobile}/${Routes.ListingDetailHistory}?listingID=${listingID}&biddingID=${biddingID}`,
      );
    },
    [router],
  );

  const handleClickBack = useCallback(() => {
    router.replace(`/${Routes.EntryMobile}/${Routes.My}?default=1`);
  }, [router]);

  useEffect(() => {
    if (router.query.tab) {
      setTab(Number(router.query.tab));
    }
  }, [router.query.tab]);

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
            onNavigateToListingDetailHistory={handleNavigateToListingDetailHistory}
            onClickBack={handleClickBack}
            biddingStatus={biddingStatus}
          />
        )}
      </MobileContainer>
    </MobAuthRequired>
  );
});
