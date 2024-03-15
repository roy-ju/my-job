import { useRouter } from 'next/router';

import { Popup, OverlayPresenter } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

export default function NeedConfirmAddressPopup({ handleConfirm }: CommonPopupProps) {
  const { query } = useRouter();

  const remainingCount = query?.remainingCount ? Number(query.remainingCount) : 0;

  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="gap-2">
          <Popup.Title>주소를 다시 한번 확인해주세요.</Popup.Title>
          <Popup.Body>
            입력하신 주소는 등기부 조회가 불가합니다.
            <br />
            주소 확인 후 정확하게 입력해주세요.
            <br />
            <br />
            현재 주소 입력 가능 횟수는 총 {remainingCount}회입니다.
            <br />
            (주소 입력 횟수는 1일 최대 5회이며, 초과할 경우 금일
            <br />
            23:59까지 주소 조회가 불가합니다. 이 점 유의해주세요.)
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
