import React from 'react';

import { NavigationHeader, OverlayPresenter, Popup } from '@/components/molecules';

import { ButtonV2 } from '@/components/atoms';

import NoData from './main/Nodata';

import useQnaMain from './main/hooks/useQnaMain';

import List from './main/List';

import QnaCreate from './main/QnaCreate';

export default function QnaMain() {
  const {
    loggedIn,
    isQnaCreateOpen,
    qnaText,
    list,
    headerTitle,
    isPopupOpen,
    handleClickClosePopup,
    handleClickOpenPopup,
    handleChangeQnaText,
    handleCreateServiceQna,
    handleOpenQnaCreate,
    handleCloseQnaCreate,
    handleClickBack,
  } = useQnaMain();

  const renderList = () => {
    if (list.length > 0) return <List list={list} />;

    return (
      <div tw="mt-12">
        <NoData />
      </div>
    );
  };

  const renderListButton = () => (
    <ButtonV2 onClick={handleOpenQnaCreate} size="bigger" tw="w-full">
      문의하기
    </ButtonV2>
  );

  const renderQnaCreate = () => (
    <QnaCreate
      value={qnaText}
      onChange={handleChangeQnaText}
      placeholder="내용을 입력하세요 &#13;&#10;매물에 대한 문의는 중개사에게 문의하기를 이용하세요"
    />
  );

  const renderQnaCreateButton = () => (
    <ButtonV2 onClick={handleClickOpenPopup} size="bigger" tw="w-full" disabled={!qnaText}>
      작성완료
    </ButtonV2>
  );

  return (
    <>
      <div tw="relative flex flex-col h-full">
        <NavigationHeader>
          {isQnaCreateOpen ? (
            <NavigationHeader.BackButton onClick={handleCloseQnaCreate} />
          ) : (
            <NavigationHeader.BackButton onClick={handleClickBack} />
          )}

          <NavigationHeader.Title>{headerTitle}</NavigationHeader.Title>
        </NavigationHeader>

        {loggedIn ? (
          <>
            <div tw="flex-1 overflow-y-auto">{isQnaCreateOpen ? renderQnaCreate() : renderList()}</div>
            <div tw="w-full px-5 py-4 bg-white shadow-persistentBottomBar">
              {isQnaCreateOpen ? renderQnaCreateButton() : renderListButton()}
            </div>
          </>
        ) : (
          <>
            <div tw="flex-1 overflow-y-auto">{renderList()}</div>
            <div tw="w-full px-5 py-4 bg-white shadow-persistentBottomBar">{renderListButton()}</div>
          </>
        )}
      </div>

      {isPopupOpen && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-12">
              <Popup.Title>
                작성하신 내용은 수정할 수 없습니다.
                <br />위 내용으로 문의하시겠습니까?
              </Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={handleClickClosePopup}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={handleCreateServiceQna}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
}
