import { Panel } from '@/components/atoms';
import { memo } from 'react';
import { MyFavoriteList as MyFavoriteListTemplate } from '@/components/templates';
import { useRouter } from '@/hooks/utils';
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
    ListingFavoriteCount,
    danjiFavoriteCount,
    handleToggleListingLike,
    handleToggleDanjiLike,
    listingIncrementalPageNumber,
    danjiIncrementalPageNumber,
  } = useMyFavoriteList();

  // const handleClickDanjiItem = useCallback((id: number) => {}, [router]);
  //  const handleClickListingItem = useCallback((id: number) => {}, [router]);

  return (
    <Panel width={panelWidth}>
      <MyFavoriteListTemplate
        danjiList={danjiList ?? []}
        listingList={listingList ?? []}
        danjiFavoriteCount={danjiFavoriteCount ?? 0}
        listingFavoriteCount={ListingFavoriteCount ?? 0}
        onToggleDanjiLike={handleToggleDanjiLike}
        onToggleListingLike={handleToggleListingLike}
        onDanjiNext={danjiIncrementalPageNumber}
        onListingNext={listingIncrementalPageNumber}
      />
    </Panel>
  );
});
