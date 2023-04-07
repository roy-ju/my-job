import { Popup } from '@/components/molecules';

export default function TransactionConditionPopup({ onClick: handleClick }: { onClick: () => void }) {
  return (
    <div tw="absolute">
      <Popup>
        <Popup.ContentGroup>
          <Popup.Title>상세주소 요청</Popup.Title>
          <Popup.Body>
            상세주소는 담당중개사가 허용할 경우 공개됩니다.
            <br />
            중개사와 채팅을 통해서 주소공개를 요청하실 수 있습니다.
          </Popup.Body>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleClick}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </div>
  );
}
