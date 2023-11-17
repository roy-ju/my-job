import { SuggestRecommendDetailList } from '@/apis/suggest/getMySuggestRecommends';
import ListItemListingSection from './ListItemListingSection';
import ListItemTitleSection from './ListItemTitleSection';

type ListItemProps = {
  item: SuggestRecommendDetailList;
};

export default function ListItem({ item }: ListItemProps) {
  const isExistedList = item?.suggest_recommend_detail_list && item.suggest_recommend_detail_list.length > 0;

  return (
    <div tw="p-4 rounded-lg border border-gray-300 flex flex-col gap-4">
      <ListItemTitleSection item={item} />
      {isExistedList &&
        item.suggest_recommend_detail_list.map((data) => (
          <ListItemListingSection key={data.suggest_recommend_id} item={data} />
        ))}
    </div>
  );
}
