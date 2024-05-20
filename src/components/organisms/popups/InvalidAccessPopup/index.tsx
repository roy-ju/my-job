import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { OverlayPresenter, Popup } from '@/components/molecules';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import { CommonPopupProps } from '@/types/popups';

export default function InvalidAccessPopup({
  message = '유효하지 않은 페이지입니다.',
  handleConfirm,
}: CommonPopupProps) {
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
        <Popup.ContentGroup>
          <Popup.Title tw="text-center">{message}</Popup.Title>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={handleConfirm || handleClickConfirm}>
            네고시오 홈으로 돌아가기
          </Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
