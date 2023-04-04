import { Panel } from '@/components/atoms';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { MyDetail as MyDetailTemplate } from '@/components/templates';
import { memo } from 'react';
import useMyDetail from './useMyDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const {
    nickname,
    email,
    name,
    phone,
    roadNameAddress,
    addressDetail,
    ownershipVerified,
    nicknamePopup,
    updateNicknameButtonDisabled,
    handleClickDeregister,
    handleLogout,
    handleUpdateAddress,
    handleUpdatePhone,
    handleClickUpdateNickname,
    updateNickname,
    cancelUpdateNickname,
    handleChangeNickname,
  } = useMyDetail(depth);

  return (
    <Panel width={panelWidth}>
      <MyDetailTemplate
        nickname={nickname}
        email={email ?? ''}
        name={name ?? ''}
        phone={phone ?? ''}
        address={roadNameAddress ?? ''}
        addressDetail={addressDetail ?? ''}
        addressVerified={ownershipVerified ?? false}
        updateNicknameButtonDisabled={updateNicknameButtonDisabled}
        onChangeNickname={handleChangeNickname}
        onClickDeregister={handleClickDeregister}
        onClickLogout={handleLogout}
        onClickUpdateAddress={handleUpdateAddress}
        onClickUpdatePhone={handleUpdatePhone}
        onClickUpdateNickname={handleClickUpdateNickname}
      />
      {nicknamePopup && (
        <OverlayPresenter>
          <Popup>
            <div tw="px-5 py-6 flex flex-col gap-4">
              <Popup.Title>닉네임을 변경하시겠습니까?</Popup.Title>
              <Popup.Contents>7일 후에 다시 변경할 수 있습니다.</Popup.Contents>
            </div>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={cancelUpdateNickname}>취소</Popup.CancelButton>
              <Popup.ActionButton onClick={updateNickname}>변경하기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </Panel>
  );
});
