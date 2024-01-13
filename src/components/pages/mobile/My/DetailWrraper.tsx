import { MobileContainer } from '@/components/atoms';

import { OverlayPresenter } from '@/components/molecules';

import { UpdateEmailPopup, UpdateNicknamePopup } from '@/components/organisms';

import { MobMyDetail } from '@/components/templates';

import useScrollLock from '@/hooks/useScrollLock';

import useMyDetail from './hooks/useMyDetail';

export default function DetailWrraper() {
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
    handleNavigateToVerifyCi,
  } = useMyDetail();

  useScrollLock(
    nicknamePopup ||
      emailPopup ||
      updateEmailPopup === 'success' ||
      updateEmailPopup === 'duplicated_ci' ||
      updateEmailPopup === 'duplicated_email',
  );

  return (
    <MobileContainer>
      <MobMyDetail
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
        onClickVerifyCi={handleNavigateToVerifyCi}
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
      {updateEmailPopup === 'success' && (
        <OverlayPresenter>
          <UpdateEmailPopup.Success onClickClose={handleCloseEmailUpdatePopup} />
        </OverlayPresenter>
      )}
      {updateEmailPopup === 'duplicated_ci' && (
        <OverlayPresenter>
          <UpdateEmailPopup.DuplicatedCi onClickClose={handleCloseEmailUpdatePopup} />
        </OverlayPresenter>
      )}
      {updateEmailPopup === 'duplicated_email' && (
        <OverlayPresenter>
          <UpdateEmailPopup.DuplicatedEmail
            onClickOverwrite={handleCloseEmailUpdatePopup}
            onClickClose={handleCloseEmailUpdatePopup}
          />
        </OverlayPresenter>
      )}
    </MobileContainer>
  );
}
