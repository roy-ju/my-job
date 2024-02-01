import { memo, useState, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';

import { AuthRequired, Loading, Panel } from '@/components/atoms';

import { MyParticipatingListings as MyParticipatingListingsTemplate } from '@/components/templates';

import Routes from '@/router/routes';

import useMyParticipatingListings from './useMyParticipatingListings';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter();

  const { biddingStatus, isLoading } = useMyParticipatingListings();

  const [tab, setTab] = useState(Number(router.query.tab));

  const handleChangeListingTab = useCallback(
    (newValue: number) => {
      setTab(Number(newValue));
      router.push({ pathname: `/${Routes.My}/${Routes.MyParticipatingListings}`, query: { tab: `${newValue}` } });
    },
    [setTab, router],
  );

  const handleNavigateToListingDetailHistory = useCallback(
    (listingId: number, biddingId: number) => () => {
      router.replace({
        pathname: `/${Routes.My}/${Routes.ListingDetailHistory}`,
        query: {
          listingID: `${listingId}`,
          biddingID: `${biddingId}`,
        },
      });
    },
    [router],
  );

  useEffect(() => {
    if (router.query.tab) {
      setTab(Number(router.query.tab));
    }
  }, [router.query.tab]);

  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        {isLoading ? (
          <div tw="py-20">
            <Loading />
          </div>
        ) : (
          <MyParticipatingListingsTemplate
            tab={tab}
            onChangeListingTab={handleChangeListingTab}
            onNavigateToListingDetailHistory={handleNavigateToListingDetailHistory}
            biddingStatus={biddingStatus}
          />
        )}
      </Panel>
    </AuthRequired>
  );
});
