import { NavigationHeader } from '@/components/molecules';
import { Button, Separator } from '@/components/atoms';

export default function RecommendationForm() {
  return (
    <div tw="flex flex-col h-full">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={() => {}} />
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
              <Button size="bigger" variant="outlined" tw="flex-1" selected={false} onClick={() => {}}>
                지역
              </Button>
              <Button size="bigger" variant="outlined" tw="flex-1" selected onClick={() => {}}>
                단지
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
