import { AuthRequired, Panel } from '@/components/atoms';
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
    profileImageUrl,
    privacyRetentionValue,
    // roadNameAddress,
    // addressDetail,
    // ownershipVerified,
    nicknamePopup,
    emailPopup,
    updateNicknameButtonDisabled,
    updateEmailPopup,
    handleClickDeregister,
    handleLogout,
    // handleUpdateAddress,
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
    handleChangeUpdatePrivacyRetentionType,
  } = useMyDetail(depth);

  return (
    <AuthRequired depth={depth}>
      <Panel width={panelWidth}>
        <MyDetailTemplate
          isLoading={isLoading}
          nickname={nickname}
          email={email ?? ''}
          name={name ?? ''}
          phone={phone ?? ''}
          profileImageUrl={profileImageUrl ?? ''}
          // address={roadNameAddress ?? ''}
          // addressDetail={addressDetail ?? ''}
          // addressVerified={ownershipVerified ?? false}
          privacyRetentionType={privacyRetentionValue ?? ''}
          updateNicknameButtonDisabled={updateNicknameButtonDisabled}
          onChangeNickname={handleChangeNickname}
          onClickDeregister={handleClickDeregister}
          onClickLogout={handleLogout}
          // onClickUpdateAddress={handleUpdateAddress}
          onClickUpdatePhone={handleUpdatePhone}
          onClickUpdateNickname={handleClickUpdateNickname}
          onClickUpdateEmail={handleClickUpdateEmail}
          onClickUpdateProfileImage={handleUploadProfileImage}
          onClickUpdatePrivacyRetentionType={handleChangeUpdatePrivacyRetentionType}
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
      </Panel>
    </AuthRequired>
  );
});
