import { GetSuggestDetailResponse } from '@/apis/suggest/getSuggestDetail';
import { Button, PersistentBottomBar } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';
import { SuggestDetailListItem } from '@/components/organisms';
import tw from 'twin.macro';

type Props = {
  data?: GetSuggestDetailResponse;

  isExistMySuggested?: boolean;

  disabledCTA?: boolean;
  onClickCTA?: () => void;

  onClickBack?: () => void;
};

export default function SuggestDetail({
  data,

  isExistMySuggested,

  disabledCTA,
  onClickCTA,

  onClickBack,
}: Props) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>구해요 상세</NavigationHeader.Title>
      </NavigationHeader>

      <div tw="px-5 pt-7 flex-1 overflow-auto">
        <SuggestDetailListItem>
          <SuggestDetailListItem.UserInfo data={data} />
          <SuggestDetailListItem.ListingInfo data={data} />
          {isExistMySuggested && <SuggestDetailListItem.SuggestedListings />}
        </SuggestDetailListItem>
      </div>

      <PersistentBottomBar>
        <div tw="w-full" css={[disabledCTA ? tw`[padding-bottom: 4px]` : tw`[padding-bottom: 26px]`]}>
          <Button size="bigger" tw="w-full" disabled={!!disabledCTA} onClick={onClickCTA}>
            내 매물 추천하기
          </Button>
          {disabledCTA && (
            <p tw="[padding-top: 7px] text-info text-center leading-4">지금은 요청자가 요청을 중단했어요.</p>
          )}
        </div>
      </PersistentBottomBar>
    </div>
  );
}
