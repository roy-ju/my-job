import { GetMySuggestRecommendedListResponse } from '@/apis/suggest/getMySuggestRecommendedList';
import { NavigationHeader, NoDataUI } from '@/components/molecules';
import { InfiniteScroll } from '@/components/atoms';
import { SuggestRecommendedListItem } from '@/components/organisms';

interface Props {
  suggestRecommendedList?: GetMySuggestRecommendedListResponse['list'];
  onNextListing?: () => void;
  onClickBack?: () => void;
  onClickSuggestRecommendCancel?: (suggestRecommendId: number) => void;
  onNavigateToDanjiRecommendation?: () => void;
  onNavigateToChatRoom?: (chatRoomId: number) => void;
  onDeleteSuggestRecommend?: (suggestRecommendId: number) => void;
}

export default function SuggestRecommendedList({
  suggestRecommendedList,
  onNextListing,
  onClickBack,
  onClickSuggestRecommendCancel,
  onNavigateToDanjiRecommendation,
  onNavigateToChatRoom,
  onDeleteSuggestRecommend,
}: Props) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>타인 구하기에 대한 나의 추천</NavigationHeader.Title>
      </NavigationHeader>

      {suggestRecommendedList?.length ? (
        <div tw="flex-1 min-h-0 overflow-auto pt-7 pb-10 px-5 flex flex-col gap-5">
          <InfiniteScroll onNext={onNextListing} tw="overflow-y-visible">
            <div tw="flex flex-col gap-5">
              {suggestRecommendedList?.map(({ suggest_item, suggest_recommend_item }) => (
                <SuggestRecommendedListItem
                  suggestItem={suggest_item}
                  suggestRecommendItem={suggest_recommend_item}
                  key={suggest_recommend_item.suggest_recommend_id}
                  onClickSuggestRecommendCancel={onClickSuggestRecommendCancel}
                  onNavigateToChatRoom={onNavigateToChatRoom}
                  onDeleteSuggestRecommend={onDeleteSuggestRecommend}
                />
              ))}
            </div>
          </InfiniteScroll>
        </div>
      ) : (
        <NoDataUI
          title="추천한 매물이 없습니다."
          body="단지 정보 화면에서 구하는 글에 매물을 추천해 보세요!"
          buttonText="추천할 단지 찾기"
          onClick={onNavigateToDanjiRecommendation}
        />
      )}
    </div>
  );
}
