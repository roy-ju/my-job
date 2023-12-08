import React from 'react';
import { Loading, Separator } from '@/components/atoms';
import { NavigationHeader, OverlayPresenter, Popup } from '@/components/molecules';
import { List, ListHeader, Summary } from '../organisms';
import useHandleClickBack from '../../hooks/useHandleClickBack';
import useInactive from '../../hooks/useInactive';
import useMySuggestDetailStore from '../../hooks/useMySuggestDetailStore';

export default function MySuggestDetail() {
  const value = useMySuggestDetailStore();

  const { renderBackUICondition, handleClickBack } = useHandleClickBack();

  const { showInactivePopup, inactivePopupCTA } = useInactive();

  if (!value) return null;

  if (value.isLoading) {
    return (
      <div tw="h-full flex flex-col">
        <Loading />
      </div>
    );
  }

  if (showInactivePopup) {
    return (
      <OverlayPresenter>
        <Popup>
          <Popup.ContentGroup tw="py-6">
            <Popup.SubTitle tw="text-center">
              현재 로그인 계정으로는
              <br />
              접근이 불가능한 페이지입니다.
            </Popup.SubTitle>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.ActionButton onClick={inactivePopupCTA}>네고시오 홈으로 돌아가기</Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </OverlayPresenter>
    );
  }

  return (
    <div tw="h-full flex flex-col">
      <NavigationHeader>
        {renderBackUICondition && <NavigationHeader.BackButton onClick={handleClickBack} />}
        <NavigationHeader.Title>구해요 상세</NavigationHeader.Title>
      </NavigationHeader>

      <div tw="h-px bg-gray-300" />

      {!showInactivePopup && (
        <div tw="overflow-auto">
          <Summary />
          <Separator tw="bg-gray-300 h-2" />
          <ListHeader />
          <List />
        </div>
      )}
    </div>
  );
}
