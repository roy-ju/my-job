import { Loading, Separator } from '@/components/atoms';

import { NavigationHeader, OverlayPresenter, Popup } from '@/components/molecules';

import ListHeader from './ListHeader';

import List from './List';

import Summary from './Summary';

import useMySuggestDetailStore from './hooks/useMySuggestDetailStore';

import useInactive from './hooks/useInactive';

import useHandleClickBack from './hooks/useHandleClickBack';

type SuggestDetailProps = { depth?: number };

export default function SuggestDetail({ depth }: SuggestDetailProps) {
  const value = useMySuggestDetailStore();

  const { renderBackUICondition, handleClickBack } = useHandleClickBack({ depth });

  const { showInactivePopup, inactivePopupCTA } = useInactive({ depth });

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
          <Summary depth={depth} />
          <Separator tw="bg-gray-300 h-2" />
          <ListHeader />
          <List depth={depth} />
        </div>
      )}
    </div>
  );
}
