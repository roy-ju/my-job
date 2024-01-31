import { MobAuthRequired, MobileContainer } from '@/components/atoms';

import { OverlayPresenter } from '@/components/molecules';

import MyDetail from '@/components/domains/my/MyDetail';

import useMyDetailMobile from '@/components/domains/my/detail/hooks/useMyDetailMobile';

import UpdateNicknamePopup from '@/components/domains/my/detail/popups/UpdateNickname';

import UpdateEmail from '@/components/domains/my/detail/popups/UpdateEmail';

export default function MyDetailMobile() {
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
    handleClickBack,
  } = useMyDetailMobile();

  return (
    <MobAuthRequired>
      <MobileContainer>
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
          onClickBack={handleClickBack}
        />

        {nicknamePopup && (
          <OverlayPresenter>
            <UpdateNicknamePopup onClickCancel={cancelUpdateNickname} onClickUpdate={updateNickname} />
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
      </MobileContainer>
    </MobAuthRequired>
  );
}
