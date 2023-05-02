import { Loading, MobileContainer } from '@/components/atoms';
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

  const handleNavigateToListingDetailHistory = () => () => {
    // router.replace(Routes.ListingDetailHistory, {
    //   persistParams: true,
    //   searchParams: {
    //     listingID: `${listingId}`,
    //     biddingID: `${biddingId}`,
    //   },
    // });
  };

  const handleClickBack = useCallback(() => {
    router.back();
  }, [router]);

  if (!isLoading) {
    return (
      <MobileContainer>
        <div tw="py-20">
          <Loading />
        </div>
      </MobileContainer>
    );
  }

  return (
    <MobileContainer>
      <MyParticipatingListingsTemplate
        tab={tab}
        onChangeListingTab={handleChangeListingTab}
        onClickListingItem={handleClickListingItem}
        onNavigateToListingDetailHistory={handleNavigateToListingDetailHistory}
        onClickBack={handleClickBack}
        biddingStatus={biddingStatus}
      />
    </MobileContainer>
  );
});
