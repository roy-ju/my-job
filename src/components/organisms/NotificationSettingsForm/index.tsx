import { Switch } from '@/components/atoms';
import tw, { styled } from 'twin.macro';

const Container = styled.div`
  ${tw`px-5`}
  & > div {
    ${tw`py-4`}
    &:not(:first-of-type) {
      ${tw`border-t border-gray-100`}
    }
  }
`;

function Service() {
  return (
    <div tw="flex items-center justify-between">
      <div tw="flex flex-col gap-2 ">
        <div tw="text-b2 leading-none font-bold">서비스 알림</div>
        <div tw="text-info leading-none text-gray-700">거래, 회원 정보, 커뮤니티 관련 알림을 푸시로 받습니다.</div>
      </div>
      <Switch />
    </div>
  );
}

function Chat() {
  return (
    <div tw="flex items-center justify-between">
      <div tw="flex flex-col gap-2 ">
        <div tw="text-b2 leading-none font-bold">채팅 알림</div>
      </div>
      <Switch />
    </div>
  );
}

function Marketing() {
  return (
    <div tw="flex items-center justify-between">
      <div tw="flex flex-col gap-2 ">
        <div tw="text-b2 leading-none font-bold">이벤트 및 마케팅 정보 수신</div>
        <div tw="text-info leading-none text-gray-700">마케팅 정보 수신 동의 2023.03.09 오전 11:11</div>
      </div>
      <Switch />
    </div>
  );
}

export default Object.assign(Container, {
  Service,
  Chat,
  Marketing,
});
