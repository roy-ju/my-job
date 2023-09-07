import { Popup } from '@/components/molecules';

function ChatRoomPopup() {
  return null;
}

interface OneProps {
  onClickClose?: () => void;
}

/**
 * user type: 집주인,
 * 매물 등록 - 채팅 나가기 못하는 경우
 */

function CloseCase1({ onClickClose }: OneProps) {
  return (
    <Popup>
      <Popup.ContentGroup>
        <Popup.SubTitle tw="text-center">
          등록한 매물이 있는 경우 채팅방 나가기는
          <br />
          거래성사 또는 매물등록 취소 후 가능합니다.
        </Popup.SubTitle>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.ActionButton onClick={onClickClose}>닫기</Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}

interface TwoProps {
  onClickClose?: () => void;
  onLeaveChatRoom?: () => void;
  isLoading?: boolean;
}

/**
 * user type: 집주인,
 * 매물 등록 - 채팅 나가기 가능한 경우
 */

function CloseCase2({ onClickClose, onLeaveChatRoom, isLoading }: TwoProps) {
  return (
    <Popup>
      <Popup.ContentGroup>
        <Popup.SubTitle tw="text-center">
          채팅방을 나가시겠습니까?
          <br />
          채팅 내용은 지난 거래 매물에서 확인할 수 있습니다.
        </Popup.SubTitle>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.CancelButton isLoading={isLoading} onClick={onClickClose}>
          취소
        </Popup.CancelButton>
        <Popup.ActionButton isLoading={isLoading} onClick={onLeaveChatRoom}>
          나가기
        </Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}

interface ThreeProps {
  onClickClose?: () => void;
  onLeaveChatRoom?: () => void;
  isLoading?: boolean;
}

/**
 * user type: 매수인 / 임차인,
 * 협의중 혹은 거래참여 계약체결 + 매물추천 거래성사 당일 이후인 당사자
 */

function CloseCase3({ onClickClose, onLeaveChatRoom, isLoading }: ThreeProps) {
  return (
    <Popup>
      <Popup.ContentGroup>
        <Popup.SubTitle tw="text-center">
          채팅방을 나가면 협의가 종료됩니다.
          <br />
          채팅방을 나가시겠습니까?
        </Popup.SubTitle>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.CancelButton isLoading={isLoading} onClick={onClickClose}>
          취소
        </Popup.CancelButton>
        <Popup.ActionButton isLoading={isLoading} onClick={onLeaveChatRoom}>
          나가기
        </Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}

interface FourProps {
  onClickClose?: () => void;
}

/**
 * user type: 매수인 / 임차인,
 * 가계약금 입금한 당사자
 */

function CloseCase4({ onClickClose }: FourProps) {
  return (
    <Popup>
      <Popup.ContentGroup>
        <Popup.SubTitle tw="text-center">
          가계약금을 입금한 매물이 있는 경우
          <br />
          채팅방을 나갈 수 없습니다.
        </Popup.SubTitle>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.ActionButton onClick={onClickClose}>닫기</Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}

interface FiveProps {
  onClickClose?: () => void;
  onLeaveChatRoom?: () => void;
  isLoading?: boolean;
}

/**
 * user type: 집주인,
 * 매물 추천 - 거래성사 전 채팅 나가기
 */

function CloseCase5({ onClickClose, onLeaveChatRoom, isLoading }: FiveProps) {
  return (
    <Popup>
      <Popup.ContentGroup>
        <Popup.SubTitle tw="text-center">
          채팅방을 나가면 추천이 취소되고 협의가 종료됩니다.
          <br />
          채팅방을 나가시겠습니까?
        </Popup.SubTitle>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.CancelButton isLoading={isLoading} onClick={onClickClose}>
          취소
        </Popup.CancelButton>
        <Popup.ActionButton isLoading={isLoading} onClick={onLeaveChatRoom}>
          나가기
        </Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}

interface SixProps {
  onClickClose?: () => void;
  onLeaveChatRoom?: () => void;
  isLoading?: boolean;
}

/**
 * user type: 집주인,
 * 매물 추천 - 거래성사 후 채팅 나가기
 */

function CloseCase6({ onClickClose, onLeaveChatRoom, isLoading }: SixProps) {
  return (
    <Popup>
      <Popup.ContentGroup>
        <Popup.SubTitle tw="text-center">
          채팅방을 나가면 협의가 종료됩니다.
          <br />
          채팅방을 나가시겠습니까?
        </Popup.SubTitle>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.CancelButton isLoading={isLoading} onClick={onClickClose}>
          취소
        </Popup.CancelButton>
        <Popup.ActionButton isLoading={isLoading} onClick={onLeaveChatRoom}>
          나가기
        </Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}

interface ContractCompleteProps {
  name?: string;
  onClickClose?: () => void;
  onClickContractComplete?: () => void;
}

function ContractComplete({ name, onClickClose, onClickContractComplete }: ContractCompleteProps) {
  return (
    <Popup>
      <Popup.ContentGroup>
        <Popup.SubTitle tw="text-center">
          {name}님과
          <br />
          거래가 성사되었나요?
          <br />
          거래성사는 선언 후 취소할 수 없어요.
        </Popup.SubTitle>
      </Popup.ContentGroup>
      <Popup.ButtonGroup>
        <Popup.CancelButton onClick={onClickClose}>취소</Popup.CancelButton>
        <Popup.ActionButton onClick={onClickContractComplete}>거래성사</Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  );
}

export default Object.assign(ChatRoomPopup, {
  CloseCase1,
  CloseCase2,
  CloseCase3,
  CloseCase4,
  CloseCase5,
  CloseCase6,
  ContractComplete,
});
