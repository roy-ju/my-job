import { MobileContainer } from '@/components/atoms';
import { memo } from 'react';
import { MyFavoriteList as MyFavoriteListTemplate } from '@/components/templates';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { MobGlobalNavigation } from '@/components/organisms';
import useSyncronizer from '@/states/syncronizer';
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

  const handleClickDanjiItem = (danjiID: number, realestateType: number) => () => {
    router.push(`/${Routes.EntryMobile}/${Routes.DanjiDetail}?danjiID=${danjiID}&rt=${realestateType}`);
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
