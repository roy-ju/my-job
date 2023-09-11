import { NavigationHeader, NoDataUI } from '@/components/molecules';

interface Props {
  onClickBack?: () => void;
  onClickDanjiRecommendation?: () => void;
}

export default function SuggestRecommendedList({ onClickBack, onClickDanjiRecommendation }: Props) {
  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton />}
        <NavigationHeader.Title>타인 구하기에 대한 나의 추천</NavigationHeader.Title>
      </NavigationHeader>
      <NoDataUI
        title="추천한 매물이 없습니다."
        body="단지 정보 화면에서 구하는 글에 매물을 추천해 보세요!"
        buttonText="추천할 단지 찾기"
        onClick={onClickDanjiRecommendation}
      />
      <div tw="flex-1 min-h-0 overflow-auto py-7 px-5 flex flex-col gap-5" />
    </div>
  );
}
