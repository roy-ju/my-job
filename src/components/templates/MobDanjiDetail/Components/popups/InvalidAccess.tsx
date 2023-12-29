import { useRouter } from 'next/router';

import { OverlayPresenter, Popup } from '@/components/molecules';

import Routes from '@/router/routes';

export default function InvalidAccess() {
  const router = useRouter();

  return (
    <OverlayPresenter>
      <Popup>
        <Popup.ContentGroup tw="py-10">
          <Popup.Title>유효하지 않은 페이지입니다.</Popup.Title>
        </Popup.ContentGroup>
        <Popup.ButtonGroup>
          <Popup.ActionButton onClick={() => router.replace(`/${Routes.EntryMobile}`)}>확인</Popup.ActionButton>
        </Popup.ButtonGroup>
      </Popup>
    </OverlayPresenter>
  );
}
