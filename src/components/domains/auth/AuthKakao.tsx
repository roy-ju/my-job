import { useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import { useTimeout } from '@/hooks/useTimeout';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import useIsNativeApp from '@/hooks/useIsNativeApp';

import { OverlayPresenter, Popup } from '@/components/molecules';

function AndroidWebAuthPopup({
  isLoading,
  handleClickConfirm,
  handleClickCancel,
}: {
  isLoading: boolean;
  handleClickConfirm: () => void;
  handleClickCancel: () => void;
}) {
  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup>
          <Popup.Title tw="text-center py-6">카카오 로그인을 진행하시겠습니까?</Popup.Title>
        </Popup.ContentGroup>

        <Popup.ButtonGroup>
          {isLoading ? (
            <Popup.ActionButton isLoading>확인</Popup.ActionButton>
          ) : (
            <>
              <Popup.CancelButton onClick={handleClickCancel}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleClickConfirm}>확인</Popup.ActionButton>
            </>
          )}
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}

export default function AuthKakao() {
  const router = useRouter();

  const { platform } = useCheckPlatform();

  const isNativeApp = useIsNativeApp();

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleCancelPopup = useCallback(() => {
    setIsPopupOpen(false);
    window.close();
  }, []);

  const loginKakao = useCallback(() => {
    const type = (router?.query?.type as string) ?? '';

    Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}/callback/kakaoLogin`,
      state: type,
    });
  }, [router?.query?.type]);

  const handleLoginWithKakao = useCallback(() => {
    if (typeof window === 'undefined') return;

    if (typeof Kakao === 'undefined') return;

    if (!platform) return;

    const ua = window?.navigator?.userAgent ?? '';

    if (platform === 'pc') {
      loginKakao();
      return;
    }

    if (platform === 'mobile') {
      if (!isNativeApp && /android/i.test(ua)) {
        setIsPopupOpen(true);
        return;
      }

      loginKakao();
    }
  }, [platform, loginKakao, isNativeApp]);

  useTimeout(handleLoginWithKakao, 300);

  return isPopupOpen ? (
    <AndroidWebAuthPopup
      handleClickConfirm={() => {
        loginKakao();
        setIsLoading(true);
      }}
      handleClickCancel={handleCancelPopup}
      isLoading={isLoading}
    />
  ) : (
    <div />
  );
}
