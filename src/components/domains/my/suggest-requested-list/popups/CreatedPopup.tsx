import { useEffect, useState } from 'react';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { CommonPopupProps } from '@/types/popups';

export default function CreatedPopup({ handleConfirm }: CommonPopupProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const c = window.sessionStorage.getItem('negocio-suggest-create-count');

      if (c) {
        setCount(Number(c));
      }
    }
  }, []);

  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="gap-2">
          <Popup.Title>{count}개의 구해요 요청이 생성됐어요!</Popup.Title>
          <Popup.Body>
            선택하신 지역별로 구해요 요청이 생성됐습니다.
            <br />각 지역별로 매물 추천을 분류하여 확인해보세요!
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
