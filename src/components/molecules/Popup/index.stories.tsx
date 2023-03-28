import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Popup } from '.';

export default {
  title: 'molecules/Popup',
  component: Popup,
} as ComponentMeta<typeof Popup>;

export const 타이틀_본문_버튼1: ComponentStory<typeof Popup> = () => (
  <Popup>
    <Popup.TextWrapper>
      <Popup.Title>상세주소 요청</Popup.Title>
      <Popup.Contents>
        상세주소는 담당중개사가 허용할 경우 공개됩니다.
        <br />
        중개사와 채팅을 통해서 주소공개를 요청하실 수 있습니다.
      </Popup.Contents>
    </Popup.TextWrapper>
    <Popup.ButtonWrapper>
      <Popup.ConfirmButton>확인</Popup.ConfirmButton>
    </Popup.ButtonWrapper>
  </Popup>
);

export const 타이틀_본문_버튼2: ComponentStory<typeof Popup> = () => (
  <Popup variant="twinButton">
    <Popup.TextWrapper>
      <Popup.Title>채팅방을 나가시겠습니까?</Popup.Title>
      <Popup.Contents>
        지금 채팅방을 나가시면 방문일정이 자동 취소됩니다.
        <br />
        방문일정이 완료되기 전까지 채팅방을 이용해주세요.
      </Popup.Contents>
    </Popup.TextWrapper>
    <Popup.ButtonWrapper>
      <Popup.CancelButton>취소</Popup.CancelButton>
      <Popup.CustomButton>채팅방 나가기</Popup.CustomButton>
    </Popup.ButtonWrapper>
  </Popup>
);

export const 본문_버튼1: ComponentStory<typeof Popup> = () => (
  <Popup>
    <Popup.TextWrapper>
      <Popup.Title>최고가 제안자가 변경조건 동의 대기중일 경우 최고가를 수락할 수 없습니다.</Popup.Title>
    </Popup.TextWrapper>
    <Popup.ButtonWrapper>
      <Popup.CustomButton>채팅방 나가기</Popup.CustomButton>
    </Popup.ButtonWrapper>
  </Popup>
);

export const 본문_버튼2: ComponentStory<typeof Popup> = () => (
  <Popup variant="twinButton">
    <Popup.TextWrapper>
      <Popup.Title>최고가 제안자가 변경조건 동의 대기중일 경우 최고가를 수락할 수 없습니다.</Popup.Title>
    </Popup.TextWrapper>
    <Popup.ButtonWrapper>
      <Popup.CancelButton>취소</Popup.CancelButton>
      <Popup.CustomButton>채팅방 나가기</Popup.CustomButton>
    </Popup.ButtonWrapper>
  </Popup>
);
