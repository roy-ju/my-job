import { Panel } from '@/components/atoms';
import { useRouter } from '@/hooks/utils';
import { memo, useState, useEffect, useCallback } from 'react';
import { MyParticipatingListings as MyParticipatingListingsTemplate } from '@/components/templates';
import Routes from '@/router/routes';
import useMyParticipatingListings from './useMyParticipatingListings';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
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
      router.replaceCurrent(Routes.MyParticipatingListings, {
        persistParams: true,
        searchParams: { tab: `${newValue}` },
      });
    },
    [setTab, router],
  );

  const handleClickListingItem = (listingId: number) => () => {
    router.push(Routes.ListingDetail, {
      persistParams: true,
      searchParams: {
        listingID: `${listingId}`,
      },
    });
  };
  const handleNavigateToListingDetailHistory = (listingId: number, biddingId: number) => () => {
    router.replace(Routes.ListingDetailHistory, {
      persistParams: true,
      searchParams: {
        listingID: `${listingId}`,
        biddingID: `${biddingId}`,
      },
    });
  };

  if (!isLoading) {
    return <Panel width={panelWidth} />;
  }

  return (
    <Panel width={panelWidth}>
      <MyParticipatingListingsTemplate
        tab={tab}
        onChangeListingTab={handleChangeListingTab}
        onClickListingItem={handleClickListingItem}
        onNavigateToListingDetailHistory={handleNavigateToListingDetailHistory}
        biddingStatus={biddingStatus}
      />
    </Panel>
  );
});
