import { GetSuggestDetailResponse } from '@/apis/suggest/getSuggestDetail';
import { NavigationHeader } from '@/components/molecules';
import { GetMySuggestRecommendsResponse } from '@/apis/suggest/getMySuggestRecommends';
import { Separator, Switch } from '@/components/atoms';
import { MySuggestDetailListItem } from '@/components/organisms';
import ListingRecommendList from './ListingRecommendList';

interface Props {
  recommendCount?: number;
  suggestData?: GetSuggestDetailResponse | null;
  recommendData?: GetMySuggestRecommendsResponse['list'];
  suggestChecked?: boolean;
  onClickBack?: () => void;
  onClickChat?: (id: number) => void;
  onClickSuggestUpdate?: () => void;
  onClickDanjiDetail?: () => void;
  onClickNotInterested?: (id: number) => void;
  onClickRecommendAccept?: (id: number) => void;
  onNextListingRecommentList?: () => void;
  onChangeSuggestChecked?: (checked: boolean) => void;
  onClickDeleteSuggest?: () => void;
  onClickDeleteSuggestRecommendItem?: (id: number) => void;
}

export default function MySuggestDetail({
  recommendData,
  recommendCount = 0,
  suggestData,
  onClickBack,
  onClickChat,
  onClickSuggestUpdate,
  onClickDanjiDetail,
  onClickNotInterested,
  onClickRecommendAccept,
  onNextListingRecommentList,
  suggestChecked,
  onChangeSuggestChecked,
  onClickDeleteSuggest,
  onClickDeleteSuggestRecommendItem,
}: Props) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>구해요 상세</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="h-px bg-gray-300" />

      <div tw="overflow-auto">
        <div tw="px-5 pt-7 pb-10">
          <MySuggestDetailListItem
            suggestData={suggestData}
            onClickSuggestUpdate={onClickSuggestUpdate}
            onClickDanjiDetail={onClickDanjiDetail}
            onClickDeleteSuggest={onClickDeleteSuggest}
          />
        </div>
        <Separator tw="bg-gray-300 h-2" />
        <div tw="pt-10 px-5 flex justify-between items-center">
          <div tw="text-gray-1000 text-b1 font-bold self-start flex items-center gap-1">
            <span>추천 현황</span>
            <span tw="text-nego-800">{recommendCount}</span>
          </div>
          <div tw="flex flex-col items-end gap-2">
            <Switch checked={suggestChecked} onChange={(e) => onChangeSuggestChecked?.(e.target.checked)} />
            <span tw="text-gray-700 text-info">
              {suggestChecked ? '추천 요청 상태입니다.' : '추천 요정이 중단된 상태입니다.'}
            </span>
          </div>
        </div>
        <div tw="flex-1 min-h-0">
          <ListingRecommendList
            onNext={onNextListingRecommentList}
            recommendData={recommendData}
            onClickChat={onClickChat}
            onClickNotInterested={onClickNotInterested}
            onClickRecommendAccept={onClickRecommendAccept}
            onClickDeleteSuggestRecommendItem={onClickDeleteSuggestRecommendItem}
          />
        </div>
      </div>
    </div>
  );
}
