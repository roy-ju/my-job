import { GetMySuggestRecommendsResponse } from '@/apis/suggest/getMySuggestRecommends';
import { InfiniteScroll } from '@/components/atoms';
import { ListingRecommendListItem, SuggestReceivedListNoData } from '@/components/organisms';

interface Props {
  recommendData?: GetMySuggestRecommendsResponse['list'];
  onClickListing?: (id: number) => void;
  onClickChat?: (id: number) => void;
  onClickNotInterested?: (id: number) => void;
  onClickRecommendAccept?: (id: number) => void;
  onClickNewRecommendations?: () => void;
  onNext?: () => void;
}

export default function ListingRecommendList({
  recommendData,
  onClickListing,
  onClickChat,
  onClickNotInterested,
  onClickRecommendAccept,
  onClickNewRecommendations,
  onNext,
}: Props) {
  if (!recommendData?.length) {
    return (
      <div tw="py-7">
        <SuggestReceivedListNoData onClick={onClickNewRecommendations} />
      </div>
    );
  }

  return (
    <div tw="py-7 px-5">
      <InfiniteScroll onNext={onNext}>
        <div tw="flex flex-col gap-5">
          {recommendData?.map((item, index) => (
            <ListingRecommendListItem
              key={item.listing_id}
              item={item}
              isLast={recommendData.length - 1 === index}
              onClickListing={() => onClickListing?.(item.listing_id)}
              onClickChat={() => onClickChat?.(item?.buyer_agent_chat_room_id ?? 0)}
              onClickNotInterested={() => onClickNotInterested?.(item.suggest_recommend_id)}
              onClickRecommendAccept={() => onClickRecommendAccept?.(item.suggest_recommend_id)}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
