import { Panel } from '@/components/atoms';
import { memo } from 'react';
import { MyFavoriteList as MyFavoriteListTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
import Routes from '@/router/routes';
import useMyFavoriteList from './useMyFavoriteList';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
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

  const handleClickDanjiItem = (danjiID: number) => () => {
    router.push(Routes.DanjiDetail, {
      searchParams: {
        danjiID: `${danjiID}`,
      },
    });
  };

  const handleClickListingItem = (listingId: number) => () => {
    router.push(Routes.ListingDetail, {
      searchParams: {
        listingID: `${listingId}`,
      },
    });
  };

  return (
    <Panel width={panelWidth}>
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
    </Panel>
  );
});
