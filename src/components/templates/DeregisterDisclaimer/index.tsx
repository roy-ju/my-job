import { Button, PersistentBottomBar, Separator, Ul } from '@/components/atoms';
import { NavigationHeader } from '@/components/molecules';

export interface DeregisterDisclaimerProps {
  onClickBack?: () => void;
  onClickDeregister?: () => void;
}

export default function DeregisterDisclaimer({ onClickDeregister, onClickBack }: DeregisterDisclaimerProps) {
  return (
    <div tw="relative h-full flex flex-col">
      <NavigationHeader>
        <NavigationHeader.BackButton onClick={onClickBack} />
        <NavigationHeader.Title>회원탈퇴</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-y-auto">
        <div tw="p-5">
          <div tw="text-h2 font-bold mb-6">탈퇴를 진행하시기 위해</div>
          <div tw="text-b2 font-bold mb-2">거래참여 및 매물등록을 취소해 주세요.</div>
          <Ul tw="mb-4">
            <li>
              매물을 등록하였거나 가격협상에 참여 중인 경우, 매물등록 취소 및 거래참여 취소 후 탈퇴할 수 있습니다.
            </li>
            <li>거래성사 매물이 있는 경우 거래성사일로부터 7일이 지난 후 탈퇴할 수 있습니다.</li>
            <li>
              가격협상이 완료되어 계약협의 중인 매물이 있는 경우, 중개사의 거래성사 또는 거래무산 처리 후 위의 탈퇴
              방법에 따라 탈퇴할 수 있습니다.
            </li>
          </Ul>
          <div tw="text-b2 font-bold mb-2">네고머니를 모두 출금해 주세요.</div>
          <Ul tw="mb-9">
            <li>탈퇴를 위해서는 보유 중인 네고머니가 없어야 합니다.</li>
          </Ul>
        </div>
        <Separator />
        <div tw="my-10 pl-5">
          <div tw="text-b1 font-bold leading-none mb-3">주의사항</div>
          <Ul>
            <li>쿠폰과 네고포인트가 모두 소멸됩니다.</li>
            <li>중개사와의 채팅이 종료되며 예약된 방문일정이 모두 자동으로 취소됩니다.</li>
            <li>등록을 신청중인 매물에 대한 정보가 삭제됩니다.</li>
          </Ul>
        </div>
      </div>
      <PersistentBottomBar>
        <Button onClick={onClickDeregister} size="bigger" variant="secondary" tw="w-full">
          탈퇴하기
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
