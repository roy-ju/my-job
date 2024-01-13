import { memo } from 'react';

import { useRouter } from 'next/router';

import { MobileContainer } from '@/components/atoms';

import { MobGlobalNavigation } from '@/components/organisms';

import { MyFavoriteList as MyFavoriteListTemplate } from '@/components/templates';

import useSyncronizer from '@/states/hooks/useSyncronizer';

import Routes from '@/router/routes';

import useMyFavoriteList from './useMyFavoriteList';

export default memo(() => {
  const router = useRouter();
  const {
    listingList,
    danjiList,
    isDanjiLoading,
    isListingLoading,
    ListingFavoriteCount,
    danjiFavoriteCount,
    handleToggleListingLike,
    handleToggleDanjiLike,
    listingIncrementalPageNumber,
    danjiIncrementalPageNumber,
    listingSortingType,
    handleChangeListingSortingType,
  } = useMyFavoriteList();

  const { unreadChatCount } = useSyncronizer();

  const handleClickDanjiItem = (danjiID: number) => () => {
    router.push(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${danjiID}`);
  };

  const handleClickListingItem = (listingId: number) => () => {
    router.push(`/${Routes.EntryMobile}/${Routes.ListingDetail}?listingID=${listingId}`);
  };

  return (
    <MobileContainer bottomNav={<MobGlobalNavigation index={1} unreadChatCount={unreadChatCount} />}>
      <MyFavoriteListTemplate
        danjiList={danjiList ?? []}
        listingList={listingList ?? []}
        isDanjiLoading={isDanjiLoading}
        isListingLoading={isListingLoading}
        danjiFavoriteCount={danjiFavoriteCount ?? 0}
        listingFavoriteCount={ListingFavoriteCount ?? 0}
        onToggleDanjiLike={handleToggleDanjiLike}
        onToggleListingLike={handleToggleListingLike}
        onDanjiNext={danjiIncrementalPageNumber}
        onListingNext={listingIncrementalPageNumber}
        listingSortingType={listingSortingType}
        handleChangeListingSortingType={handleChangeListingSortingType}
        handleClickListingItem={handleClickListingItem}
        handleClickDanjiItem={handleClickDanjiItem}
      />
    </MobileContainer>
  );
});
