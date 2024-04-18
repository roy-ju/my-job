import React from 'react';

import { OverlayPresenter, Popup } from '@/components/molecules';

type AlreadyCreatedProps = {
  handleClick: () => void;
};

export default function AlreadyCreated({ handleClick }: AlreadyCreatedProps) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="gap-2">
          <Popup.Title>이미 제출하신 구해요 요청이에요!</Popup.Title>
          <Popup.Body>{`제출하신 요청은 '마이페이지 - 구하기 게시내역'에서 확인 가능해요!`}</Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleClick}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
