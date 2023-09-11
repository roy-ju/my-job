import { NavigationHeader } from '@/components/molecules';
import { Button, Separator } from '@/components/atoms';

interface Props {
  selectedButton: 'region' | 'danji' | 'none';
  handleOpenRegionList: () => void;
  handleOpenDanjiList: () => void;
  onClickBack?: () => void;
}

export default function RecommendationForm({
  selectedButton,
  handleOpenRegionList,
  handleOpenDanjiList,
  onClickBack,
}: Props) {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>매물 구해요</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1">
        <div tw="pt-7 pb-10 px-5 flex items-center font-bold [letter-spacing: -0.25px]">
          최소 10명의 중개사님에게 추천 요청이 발송됩니다.
          <br />
          간편하게 매물 추천 받고, 합의 여부를 선택해 보세요.
        </div>
        <Separator />
        <div tw="pt-10 px-5">
          <div tw="mb-4">
            <div tw="font-bold">추천 받고 싶은 위치를 선택해 주세요.</div>
          </div>
          <div tw="flex flex-col gap-4">
            <div tw="flex gap-3">
              <Button
                size="bigger"
                variant={selectedButton === 'region' ? 'primary' : 'gray'}
                tw="flex-1"
                onClick={handleOpenRegionList}
              >
                지역
              </Button>
              <Button
                size="bigger"
                variant={selectedButton === 'danji' ? 'primary' : 'gray'}
                tw="flex-1"
                onClick={handleOpenDanjiList}
              >
                단지
              </Button>
            </div>
          </div>
          <ul tw="[list-style: disc] text-gray-700 text-info [padding-inline-start: 20px] mt-4">
            <li>
              단지를 선택하시게 되면, 해당 단지에 &#39;구해요&#39; 목록으로 표시되고, 해당 단지 집주인도 추천이
              가능합니다.
            </li>
            <li>지역을 선택하시면, 중개사에게만 표시되고, 중개사로부터만 추천받을 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
