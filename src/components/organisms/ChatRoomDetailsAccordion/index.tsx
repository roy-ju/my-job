import { Button, Chip } from '@/components/atoms';
import { Accordion } from '@/components/molecules';

export default function ChatRoomDetailsAccordion() {
  return (
    <Accordion>
      <Accordion.Summary tw="px-5 py-4">
        <div tw="flex items-center gap-3">
          <div tw="w-12 h-12 rounded-lg bg-gray-400" />
          <div>
            <div tw="flex items-center gap-1 mb-px">
              <span tw="text-info leading-3.5">네고 진행중</span>
              <Chip>참여</Chip>
            </div>
            <span tw="text-b2 font-bold">월세 3억 2,000만 / 199만</span>
          </div>
        </div>
      </Accordion.Summary>
      <Accordion.Details>
        <div tw="py-4 px-5 bg-gray-100">
          <span tw="text-b2 leading-4 mb-1.5 font-bold">공개용 주소 최대 22자 모두 노출 가능</span>
          <div tw="flex items-center gap-1">
            <span tw="text-info leading-3.5 text-gray-700">경기 성남시 분당구 동판교로 122</span>
            <Chip variant="gray">상세주소 미공개중</Chip>
          </div>
        </div>
        <div tw="py-4 px-5">
          <div tw="h-10 flex items-center gap-3 border-b border-gray-100">
            <span tw="w-21 text-b2 text-gray-700">나의 입찰가</span>
            <span tw="text-b2 leading-7">입찰에 참여하지 않았습니다.</span>
          </div>
          <div tw="h-10 flex items-center gap-3">
            <span tw="w-21 text-b2 text-gray-700">방문일정</span>
            <span tw="text-b2 leading-7">예약된 방문일정이 없습니다. </span>
          </div>
          <Button size="medium" variant="outlined" tw="mt-4 w-full">
            매물 보러 바로가기
          </Button>
        </div>
      </Accordion.Details>
    </Accordion>
  );
}
