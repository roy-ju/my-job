import { Button, PersistentBottomBar, Ul } from '@/components/atoms';

import { NavigationHeader } from '@/components/molecules';

export interface MyDeregisterDisclaimerProps {
  canDeregister?: boolean;
  onClickBack?: () => void;
  onClickDeregister?: () => void;
}

export default function MyDeregisterDisclaimer({
  canDeregister = false,
  onClickDeregister,
  onClickBack,
}: MyDeregisterDisclaimerProps) {
  return (
    <div tw="relative h-full flex flex-col">
      <NavigationHeader>
        {onClickBack && <NavigationHeader.BackButton onClick={onClickBack} />}
        <NavigationHeader.Title>회원탈퇴</NavigationHeader.Title>
      </NavigationHeader>
      <div tw="flex-1 min-h-0 overflow-y-auto">
        <div tw="p-5">
          <div tw="text-h2 font-bold mb-6">탈퇴를 진행하시기 위해</div>
          <div tw="text-b2 font-bold mb-2">매물 등록을 취소해 주세요.</div>
          <Ul tw="mb-4">
            <li>등록이 완료된 매물이 있는 경우 탈퇴할 수 없어요.</li>
            <li>거래를 마무리해 주시거나, 매물등록을 취소해 주세요.</li>
            <li>등록을 신청 중인 매물 정보는 자동으로 삭제돼요.</li>
          </Ul>
          <div tw="text-b2 font-bold mb-2">거래가 성사된 매물은 거래를 완료해 주세요.</div>
          <Ul tw="mb-9">
            <li>가계약금이 입금된 상태의 매물거래 당사자는 탈퇴할 수 없어요.</li>
            <li>매물의 거래를 완료해 주시거나, 중개사님께 거래 무산을 요청해 주세요.</li>
          </Ul>
          <div tw="text-b2 font-bold mb-2">계약체결 7일 뒤에 가능해요.</div>
          <Ul tw="mb-9">
            <li>계약 체결된 매물이 있다면, 7일 뒤에 시도해 주세요.</li>
          </Ul>
        </div>
      </div>
      <PersistentBottomBar>
        <Button disabled={!canDeregister} onClick={onClickDeregister} size="bigger" variant="secondary" tw="w-full">
          탈퇴하기
        </Button>
      </PersistentBottomBar>
    </div>
  );
}
