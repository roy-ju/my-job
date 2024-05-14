import { useCallback } from 'react';

import { useRouter } from 'next/router';

import { OverlayPresenter, Popup } from '@/components/molecules';

import useCheckPlatform from '@/hooks/useCheckPlatform';

import Routes from '@/router/routes';

import { CommonPopupProps } from '@/types/popups';

export default function UnableToViewPopup({ handleConfirm }: CommonPopupProps) {
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
          <Popup.SubTitle tw="text-center">페이지를 조회할 권한이 없습니다.</Popup.SubTitle>
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
