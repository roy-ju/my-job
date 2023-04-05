import { Panel } from '@/components/atoms';
import { OverlayPresenter } from '@/components/molecules';
import { UpdateEmailPopup, UpdateNicknamePopup } from '@/components/organisms';
import { MyDetail as MyDetailTemplate } from '@/components/templates';
import { memo } from 'react';
import useMyDetail from './useMyDetail';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const {
    isLoading,
    nickname,
    email,
    name,
    phone,
    roadNameAddress,
    addressDetail,
    ownershipVerified,
    nicknamePopup,
    emailPopup,
    updateNicknameButtonDisabled,
    handleClickDeregister,
    handleLogout,
    handleUpdateAddress,
    handleUpdatePhone,
    handleClickUpdateNickname,
    updateNickname,
    cancelUpdateNickname,
    handleChangeNickname,
    handleClickUpdateEmail,
    handleClickCancelUpdateEmail,
    handleClickUpdateToApple,
    handleClickUpdateToKakao,
  } = useMyDetail(depth);

  return (
    <Panel width={panelWidth}>
      <MyDetailTemplate
        isLoading={isLoading}
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
        onClickUpdateEmail={handleClickUpdateEmail}
      />
      {nicknamePopup && (
        <OverlayPresenter>
          <UpdateNicknamePopup onClickCancel={cancelUpdateNickname} onClickUpdate={updateNickname} />
        </OverlayPresenter>
      )}
      {emailPopup && (
        <OverlayPresenter>
          <UpdateEmailPopup
            onClickCancel={handleClickCancelUpdateEmail}
            onClickApple={handleClickUpdateToApple}
            onClickKakao={handleClickUpdateToKakao}
          />
        </OverlayPresenter>
      )}
    </Panel>
  );
});
