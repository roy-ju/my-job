import type { ComponentMeta, ComponentStory } from '@storybook/react';
import Popup from '.';

export default {
  title: 'molecules/Popup',
  component: Popup,
} as ComponentMeta<typeof Popup>;

export const Default: ComponentStory<typeof Popup> = () => (
  <Popup>
    <div tw="px-5 py-6 flex flex-col gap-4">
      <Popup.Title>상세주소 요청</Popup.Title>
      <Popup.Contents>
        상세주소는 담당중개사가 허용할 경우 공개됩니다.
        <br />
        중개사와 채팅을 통해서 주소공개를 요청하실 수 있습니다.
      </Popup.Contents>
    </div>
    <Popup.ButtonGroup>
      <Popup.ActionButton>확인</Popup.ActionButton>
    </Popup.ButtonGroup>
  </Popup>
);

export const WithTwoButton: ComponentStory<typeof Popup> = () => (
  <Popup>
    <div tw="px-5 py-6 flex flex-col gap-4">
      <Popup.Title>채팅방을 나가시겠습니까?</Popup.Title>
      <Popup.Contents>
        지금 채팅방을 나가시면 방문일정이 자동 취소됩니다.
        <br />
        방문일정이 완료되기 전까지 채팅방을 이용해주세요.
      </Popup.Contents>
    </div>
    <Popup.ButtonGroup>
      <Popup.CancelButton>취소</Popup.CancelButton>
      <Popup.ActionButton>채팅방 나가기</Popup.ActionButton>
    </Popup.ButtonGroup>
  </Popup>
);

export const OnlyTitle: ComponentStory<typeof Popup> = () => (
  <Popup>
    <div tw="px-5 py-12 text-center">
      <Popup.Title>최고가 제안자가 변경조건 동의 대기중일 경우 최고가를 수락할 수 없습니다.</Popup.Title>
    </div>
    <Popup.ButtonGroup>
      <Popup.ActionButton>채팅방 나가기</Popup.ActionButton>
    </Popup.ButtonGroup>
  </Popup>
);

export const OnlyTitleWithTwoButton: ComponentStory<typeof Popup> = () => (
  <Popup>
    <div tw="px-5 py-12 text-center">
      <Popup.Title>최고가 제안자가 변경조건 동의 대기중일 경우 최고가를 수락할 수 없습니다.</Popup.Title>
    </div>
    <Popup.ButtonGroup>
      <Popup.CancelButton>취소</Popup.CancelButton>
      <Popup.ActionButton>채팅방 나가기</Popup.ActionButton>
    </Popup.ButtonGroup>
  </Popup>
);
