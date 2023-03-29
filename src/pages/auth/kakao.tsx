import { Popup } from '@/components/molecules';
import type { NextPage } from 'next';

const Page: NextPage = () => (
  <div tw="h-full w-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
    <Popup>
      <div tw="px-5 py-12 text-center">
        <Popup.Title>카카오 로그인을 진행하시겠습니까?</Popup.Title>
      </div>
      <Popup.ButtonGroup>
        <Popup.CancelButton>취소</Popup.CancelButton>
        <Popup.ActionButton>확인</Popup.ActionButton>
      </Popup.ButtonGroup>
    </Popup>
  </div>
);

export default Page;
