import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { OverlayPresenter, Popup } from '@/components/molecules';

import useCheckPlatform from '@/hooks/utils/useCheckPlatform';

import Routes from '@/router/routes';

export default function InvalidAccessPopup() {
  const { platform } = useCheckPlatform();

  const router = useRouter();

  const handleClickConfirm = useCallback(() => {
    if (platform === 'pc') {
      router.replace('/');
    }

    if (platform === 'mobile') {
      router.replace(`/${Routes.EntryMobile}`);
    }
  }, [router, platform]);

  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="py-10">
          <Popup.Title>유효하지 않은 페이지입니다.</Popup.Title>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleClickConfirm}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
