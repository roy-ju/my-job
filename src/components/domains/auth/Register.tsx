import { useCallback } from 'react';

import dynamic from 'next/dynamic';

import tw, { styled } from 'twin.macro';

import SeperatorV2 from '@/components/atoms/SeperatorV2';

import RegisterForm from './register/RegisterForm';

import usePopupHandler from './register/hooks/usePopupHandler';

import RegisterHeader from './register/RegisterHeader';

import Cta from './register/Cta';

import useAccissbleRegister from './register/hooks/useAccissbleRegister';

import useRegisterForm from './register/hooks/useRegisterForm';

const RegisterQuit = dynamic(() => import('./register/popups/RegisterQuit'), { ssr: false });

const TermsPopup = dynamic(() => import('./register/popups/Terms'), { ssr: false });

const RegisterContainer = styled.div`
  ${tw`relative flex flex-col h-full`}
`;

const RegisterFieldContainer = styled.div`
  ${tw`flex-1 h-full min-h-0 pt-5 overflow-y-auto`}
`;

const FieldContainer = styled.div`
  ${tw`my-10`}
`;

export default function Register() {
  useAccissbleRegister();

  const { popup, termsPopupType, handleChangeTermsPopup, handlePopup, handleConfirmRegisterQuit, handleCancel } =
    usePopupHandler();

  const {
    email,
    nickname,
    nickNameRef,
    nicknameErrMsg,
    // funnelInfo,
    terms,
    formValid,
    isLoading,
    // handleChangeFunnelInfo,
    handleChangeNickname,
    handleChangeTerms,
    handleClickRegister,
    handleResetNickName,
    handleResetNickNameErrorMsg,
    handleNickNameClientValidation,
  } = useRegisterForm();

  const handleTerms = useCallback(
    (value: 'service' | 'privacy' | 'location') => {
      handlePopup('terms');
      handleChangeTermsPopup(value);
    },
    [handleChangeTermsPopup, handlePopup],
  );

  const handleCloseTermsPopup = useCallback(() => {
    handleCancel();
    handleChangeTermsPopup('');
  }, [handleChangeTermsPopup, handleCancel]);

  return (
    <>
      <RegisterContainer>
        <RegisterHeader onClickClose={() => handlePopup('quit')} />
        <RegisterFieldContainer>
          <FieldContainer tw="my-0">
            <RegisterForm.Email value={email} />
          </FieldContainer>
          <FieldContainer ref={nickNameRef}>
            <RegisterForm.Nickname
              value={nickname}
              onChange={handleChangeNickname}
              errorMessage={nicknameErrMsg}
              handleClientValidation={handleNickNameClientValidation}
              handleResetErrorMsg={handleResetNickNameErrorMsg}
              handleResetNickName={handleResetNickName}
            />
          </FieldContainer>
          <SeperatorV2 />
          {/* <FieldContainer>
            <RegisterForm.FunnelInfo value={funnelInfo} onChange={handleChangeFunnelInfo} />
          </FieldContainer>
          <SeperatorV2 /> */}
          <FieldContainer>
            <RegisterForm.Terms
              state={terms}
              onChangeState={handleChangeTerms}
              onOpenServiceTerms={() => {
                handleTerms('service');
              }}
              onOpenPrivacyPolicy={() => {
                handleTerms('privacy');
              }}
              onOpenLocationTerms={() => {
                handleTerms('location');
              }}
            />
          </FieldContainer>
        </RegisterFieldContainer>
        <Cta isLoading={isLoading} disabled={!formValid} onClickNext={handleClickRegister} />
      </RegisterContainer>
      {popup === 'quit' && <RegisterQuit handleCancel={handleCancel} handleConfirm={handleConfirmRegisterQuit} />}
      {popup === 'terms' && <TermsPopup type={termsPopupType} handleCancel={handleCloseTermsPopup} />}
    </>
  );
}
