import { OverlayPresenter } from '@/components/molecules';
import { UpdateEmailPopup, UpdateNicknamePopup } from '@/components/organisms';
import { MobMyDetail } from '@/components/templates';
import useMyDetail from './hooks/useMyDetail';

export default function DetailWrraper() {
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
    updateEmailPopup,
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
    handleCloseEmailUpdatePopup,
    handleNavigateToVerifyCi,
  } = useMyDetail();

  return (
    <>
      <MobMyDetail
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
    </>
  );
}
