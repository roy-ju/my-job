import ChevronDown from '@/assets/icons/chevron_down.svg';
import { Button, Chip } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';

import React, { useCallback, useState } from 'react';

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function MySuggestedListingItem() {
  const [open, setOpen] = useState(false);

  const handlePopup = useCallback((val: boolean) => {
    setOpen(val);
  }, []);

  return (
    <>
      <div tw="not-last-of-type:[border-bottom: 1px solid #E9ECEF] py-5">
        <div tw="flex items-center justify-between mb-1.5">
          <Chip>대기중</Chip>
          <Button variant="ghost" tw="h-4 pr-0 text-info" onClick={() => handlePopup(true)}>
            취소
          </Button>
        </div>

        <p tw="text-b1 font-bold">월세 99억 9,9999만 9,999만</p>
        <p tw="text-info">간편주소</p>

        <div tw="flex items-center">
          <span tw="text-info text-gray-700">전용 44㎡</span>
          <div tw="[height: 8px] [width: 1px] bg-gray-300" />
          <span tw="text-info text-gray-700">저/20층</span>
          <div tw="[height: 8px] [width: 1px] bg-gray-300" />
          <span tw="text-info text-gray-700">남향</span>
        </div>
      </div>
      {open && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="[text-align: center]">
              <Popup.SmallTitle>추천을 취소하시겠습니까?</Popup.SmallTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => handlePopup(false)}>닫기</Popup.CancelButton>
              <Popup.ActionButton onClick={() => handlePopup(false)}>추천 취소</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
}

export default function MySuggestedListings() {
  const [showDetails, setShowDetails] = useState(true);

  return (
    <>
      <button
        tw="w-full flex justify-between gap-4 mt-10"
        type="button"
        onClick={() => {
          setShowDetails((prev) => !prev);
        }}
      >
        <p tw="text-h2 [letter-spacing: -0.25px] font-bold">내가 추천한 매물</p>
        <div>
          <ChevronDown
            role="presentation"
            style={{
              transform: showDetails ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease-in-out',
              alignSelf: 'top',
            }}
          />
        </div>
      </button>
      {showDetails && arr.map((item) => <MySuggestedListingItem key={item} />)}
    </>
  );
}
