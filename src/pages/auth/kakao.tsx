import { Popup } from '@/components/molecules';
import { loginWithKakao } from '@/lib/kakao';
import type { NextPage } from 'next';
import { useCallback } from 'react';

const Page: NextPage = () => {
  const handleLogin = useCallback(() => {
    loginWithKakao();
  }, []);

  const handleCancel = useCallback(() => {
    window.close();
  }, []);

  return (
    <div tw="h-full w-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <Popup>
        <div tw="px-5 py-12 text-center">
          <Popup.Title>카카오 로그인을 진행하시겠습니까?</Popup.Title>
        </div>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={handleCancel}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={handleLogin}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </div>
  );
};

export default Page;
