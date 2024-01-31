import { memo } from 'react';

import MyDetail from '@/components/domains/my/MyDetail';

import Panel from '@/components/atoms/Panel';

import { AuthRequired } from '@/components/atoms';

import { OverlayPresenter } from '@/components/molecules';

import useMyDetailPc from '@/components/domains/my/detail/hooks/useMyDetailPc';

import UpdateEmail from '@/components/domains/my/detail/popups/UpdateEmail';

import UpdateNickname from '@/components/domains/my/detail/popups/UpdateNickname';

interface Props {
  depth: number;
  panelWidth?: string;
}

function MyDetailPc({ depth, panelWidth }: Props) {
  const {
    isLoading,
    nickname,
    email,
    name,
    phone,
    profileImageUrl,
    nicknamePopup,
    emailPopup,
    updateNicknameButtonDisabled,
    updateEmailPopup,
    handleClickDeregister,
    handleLogout,
    handleUpdatePhone,
    handleClickUpdateNickname,
    updateNickname,
    cancelUpdateNickname,
    handleChangeNickname,
    handleClickUpdateEmail,
    handleUploadProfileImage,
    handleClickCancelUpdateEmail,
    handleClickUpdateToApple,
    handleClickUpdateToKakao,
    handleCloseEmailUpdatePopup,
    handleUpdateVerify,
  } = useMyDetailPc(depth);

  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <MyDetail
          isLoading={isLoading}
          nickname={nickname}
          email={email ?? ''}
          name={name ?? ''}
          phone={phone ?? ''}
          profileImageUrl={profileImageUrl ?? ''}
          updateNicknameButtonDisabled={updateNicknameButtonDisabled}
          onChangeNickname={handleChangeNickname}
          onClickDeregister={handleClickDeregister}
          onClickLogout={handleLogout}
          onClickUpdatePhone={handleUpdatePhone}
          onClickUpdateNickname={handleClickUpdateNickname}
          onClickUpdateEmail={handleClickUpdateEmail}
          onClickUpdateProfileImage={handleUploadProfileImage}
          onClickVerifyCi={handleUpdateVerify}
        />
        {nicknamePopup && (
          <OverlayPresenter>
            <UpdateNickname onClickCancel={cancelUpdateNickname} onClickUpdate={updateNickname} />
          </OverlayPresenter>
        )}

        {emailPopup && (
          <OverlayPresenter>
            <UpdateEmail
              onClickCancel={handleClickCancelUpdateEmail}
              onClickApple={handleClickUpdateToApple}
              onClickKakao={handleClickUpdateToKakao}
            />
          </OverlayPresenter>
        )}

        {updateEmailPopup === 'success' && (
          <OverlayPresenter>
            <UpdateEmail.Success onClickClose={handleCloseEmailUpdatePopup} />
          </OverlayPresenter>
        )}

        {updateEmailPopup === 'duplicated_ci' && (
          <OverlayPresenter>
            <UpdateEmail.DuplicatedCi onClickClose={handleCloseEmailUpdatePopup} />
          </OverlayPresenter>
        )}

        {updateEmailPopup === 'duplicated_email' && (
          <OverlayPresenter>
            <UpdateEmail.DuplicatedEmail onClickClose={handleCloseEmailUpdatePopup} />
          </OverlayPresenter>
        )}
      </Panel>
    </AuthRequired>
  );
}

export default memo(MyDetailPc);
