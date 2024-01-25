import { useEffect } from 'react';

import { OverlayPresenter, Popup } from '@/components/molecules';

import useVerifyCiPopup from '@/states/hooks/useVerifyCiPopup';

export default function GlobalAuthVerfiyCiPopup() {
  const {
    isOpenVerifyCiPopup,
    title,
    subtitle,
    actionButtonTitle,
    cancelButtonTitle,
    actionButtonEvent,
    cancelButtonEvent,
    reset,
  } = useVerifyCiPopup();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleBack = () => {
      reset();
    };

    window.addEventListener('popstate', handleBack);

    return () => window.removeEventListener('popstate', handleBack);
  }, [reset]);

  if (!isOpenVerifyCiPopup) return null;

  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="py-6 gap-2">
          {title && <Popup.SmallTitle>본인인증</Popup.SmallTitle>}
          {subtitle && <Popup.Body>본인인증을 진행하고 있어요!</Popup.Body>}
        </Popup.ContentGroup>

        <Popup.ButtonGroup>
          {cancelButtonTitle && (
            <Popup.CancelButton onClick={cancelButtonEvent}>{cancelButtonTitle}</Popup.CancelButton>
          )}
          {actionButtonTitle && (
            <Popup.ActionButton onClick={actionButtonEvent}>{actionButtonTitle}</Popup.ActionButton>
          )}
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
