import { Popup } from '@/components/molecules';
import { loginWithKakao } from '@/lib/kakao';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

const Page: NextPage = () => {
  const router = useRouter();

  const handleLogin = useCallback(() => {
    const loginType = router.query.type;

    if (loginType === 'update') {
      loginWithKakao('update');
      return;
    }

    loginWithKakao();
  }, [router]);

  const handleCancel = useCallback(() => {
    window.close();
  }, []);

  return (
    <div tw="h-full w-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <Popup>
        <Popup.ContentGroup tw="px-5 py-12 text-center">
          <Popup.Title>카카오 로그인을 진행하시겠습니까?</Popup.Title>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.CancelButton onClick={handleCancel}>취소</Popup.CancelButton>
          <Popup.ActionButton onClick={handleLogin}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </div>
  );
};

export default Page;