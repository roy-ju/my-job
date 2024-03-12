import { Tabs } from '@/components/molecules';

type FavoriteListTabsProps = {
  value: number;
  myFavoriteListingsCount: number;
  myFavoriteDanjisCount: number;
  handleChange?: (v: number) => void;
};

export default function FavoriteListTabs({
  value,
  handleChange,
  myFavoriteListingsCount,
  myFavoriteDanjisCount,
}: FavoriteListTabsProps) {
  return (
    <Tabs value={value} onChange={handleChange}>
      <Tabs.Tab value={0}>
        매물 {myFavoriteListingsCount}
        {myFavoriteListingsCount > 99 && '+'}
      </Tabs.Tab>
      <Tabs.Tab value={1}>
        단지 {myFavoriteDanjisCount}
        {myFavoriteDanjisCount > 99 && '+'}
      </Tabs.Tab>
      <Tabs.Indicator />
    </Tabs>
  );
}
