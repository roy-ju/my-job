import { useCallback } from 'react';

import { useRouter } from 'next/router';

import tw, { styled } from 'twin.macro';

import { Loading } from '@/components/atoms';

import { NavigationHeader, OverlayPresenter } from '@/components/molecules';

import useAuth from '@/hooks/services/useAuth';

import Form from './detail/Form';

import UpdateNickname from './detail/popups/UpdateNickname';

import LogoutAndDeregister from './detail/LogoutAndDeregister';

import useUserProfileImageUpdate from './detail/hooks/useUserProfileImageUpdate';

import useUserNameFieldUpdate from './detail/hooks/useUserNameFieldUpdate';

import useUserNicknameUpdate from './detail/hooks/useUserNicknameFieldUpdate';

import useUserLogoutAndDeregister from './detail/hooks/useUserLogoutAndDeregister';

import useUserPhoneUpdate from './detail/hooks/useUserPhoneFieldUpdate';

import useUserVerifyCi from './detail/hooks/useUserVerifyCi';

import useUserEasyLoginFieldUpdate from './detail/hooks/useUserEasyLoginFieldUpdate';

import { DuplicatedCi, SocialLoginPopup, Success, DuplicatedEmail } from './detail/popups/UpdateEmail';

const Container = styled.div`
  ${tw`flex flex-col h-full`}
`;

const FlexContents = styled.div`
  ${tw`flex-1 min-h-0 overflow-y-auto`}
`;

const FieldContainer = styled.div`
  ${tw`flex flex-col gap-4`}
`;

export default function MyDetail() {
  const router = useRouter();

  const { user, logout, mutate: mutateUser, isLoading } = useAuth();

  const handleClickBack = useCallback(() => router.back(), [router]);

  const { profileImageUrl, handleUploadProfileImage } = useUserProfileImageUpdate({ user, mutateUser });

  const {
    name,
    nameLabel,
    verifiedMessage,
    nameInputDisabled,
    nameUpdateButtonDisabled,
    handleChangeName,
    handleUpdateNameFieldFocus,
    handleResetName,
    handleUpdateName,
  } = useUserNameFieldUpdate({ user, mutateUser });

  const {
    nickname,
    nicknameLabel,
    nicknameErrMsg,
    nicknamePopup,
    nicknameUpdateButtonDisabled,
    handleChangeNickname,
    handleResetNickname,
    handleUpdateNickname,
    handleOpenNicknameUpdatePopup,
    handleCloseNicknameUpdatePopup,
  } = useUserNicknameUpdate({ user, mutateUser });

  const { phone, phoneLabel, noPhoneText, handleClickUpdatePhone } = useUserPhoneUpdate({ user });

  const {
    email,
    easyLoginFieldLabel,
    socialLoginPopup,
    updateEmailPopup,
    handleOpenSocialLoginPopup,
    handleCloseSocialLoginPopup,
    handleCloseEmailUpdatePopup,
    handleClickUpdateToKakao,
    handleClickUpdateToApple,
  } = useUserEasyLoginFieldUpdate({ user });

  const { handleUpdateVerify } = useUserVerifyCi();

  const { handleClickLogout, handleClickDeregister } = useUserLogoutAndDeregister({ logout });

  const handleCloseUpdateEmailSuccessPopup = useCallback(() => {
    handleCloseEmailUpdatePopup();
    mutateUser(false);
  }, [handleCloseEmailUpdatePopup, mutateUser]);

  return (
    <>
      <Container>
        <NavigationHeader>
          <NavigationHeader.BackButton onClick={handleClickBack} />
          <NavigationHeader.Title tw="text-b1">회원정보</NavigationHeader.Title>
        </NavigationHeader>

        <FlexContents>
          {isLoading ? (
            <Loading tw="mt-10" />
          ) : (
            <Form tw="px-5" css={[user?.isVerified ? tw`pb-16` : tw`pb-10`]}>
              <Form.ProfileImage profileImageUrl={profileImageUrl} onClickUpdate={handleUploadProfileImage} />
              <FieldContainer>
                <Form.Name
                  label={nameLabel}
                  value={name}
                  message={verifiedMessage}
                  inputDisabled={nameInputDisabled}
                  updateButtonDisbled={Boolean(nameUpdateButtonDisabled)}
                  onChange={handleChangeName}
                  handleClickReset={handleResetName}
                  handleUpdateField={handleUpdateName}
                  handleUpdateNameFieldFocus={handleUpdateNameFieldFocus}
                />
                <Form.Nickname
                  label={nicknameLabel}
                  value={nickname}
                  message={nicknameErrMsg}
                  updateButtonDisbled={Boolean(nicknameUpdateButtonDisabled)}
                  onChange={handleChangeNickname}
                  handleClickReset={handleResetNickname}
                  handleUpdateField={handleOpenNicknameUpdatePopup}
                />
                <Form.Phone
                  label={phoneLabel}
                  value={phone}
                  noValueText={noPhoneText}
                  handleUpdateField={handleClickUpdatePhone}
                />
                <Form.EasyLogin
                  label={easyLoginFieldLabel}
                  value={email}
                  handleUpdateField={handleOpenSocialLoginPopup}
                />
                <Form.VerifyCi render={!user?.isVerified} handleClick={handleUpdateVerify} />
              </FieldContainer>
            </Form>
          )}

          <LogoutAndDeregister handleClickLogout={handleClickLogout} handleClickDeregister={handleClickDeregister} />
        </FlexContents>
      </Container>

      {nicknamePopup && (
        <OverlayPresenter>
          <UpdateNickname onClickCancel={handleCloseNicknameUpdatePopup} onClickUpdate={handleUpdateNickname} />
        </OverlayPresenter>
      )}

      {socialLoginPopup && (
        <OverlayPresenter>
          <SocialLoginPopup
            onClickCancel={handleCloseSocialLoginPopup}
            onClickApple={handleClickUpdateToApple}
            onClickKakao={handleClickUpdateToKakao}
          />
        </OverlayPresenter>
      )}

      {updateEmailPopup === 'success' && (
        <OverlayPresenter>
          <Success onClickClose={handleCloseUpdateEmailSuccessPopup} />
        </OverlayPresenter>
      )}

      {updateEmailPopup === 'duplicated_ci' && (
        <OverlayPresenter>
          <DuplicatedCi onClickClose={handleCloseEmailUpdatePopup} />
        </OverlayPresenter>
      )}

      {updateEmailPopup === 'duplicated_email' && (
        <OverlayPresenter>
          <DuplicatedEmail onClickClose={handleCloseEmailUpdatePopup} />
        </OverlayPresenter>
      )}
    </>
  );
}
