import dynamic from 'next/dynamic';

import tw, { styled } from 'twin.macro';

import RegisterForm from './register/RegisterForm';

import usePopupHandler from './register/hooks/usePopupHandler';

import RegisterHeader from './register/RegisterHeader';

import Cta from './register/Cta';

import useAccissbleRegister from './register/hooks/useAccissbleRegister';

import useStep from './register/hooks/useStep';

import useFieldName from './register/hooks/useFieldName';

import useFieldPhone from './register/hooks/useFieldPhone';

import useFieldTerms from './register/hooks/useFieldTerms';

import useFieldVerificationPhone from './register/hooks/useFieldVerificationPhone';

import useRegisterHandlers from './register/hooks/useRegisterHandlers';

import REGISTER_STEP from './register/constants/registerStep';

import FIELD_ID from './register/constants/fieldId';

const RegisterQuit = dynamic(() => import('./register/popups/RegisterQuit'), { ssr: false });

const TermsPopup = dynamic(() => import('./register/popups/Terms'), { ssr: false });

const SendSms = dynamic(() => import('./register/popups/SendSms'), { ssr: false });

const MaxSmsAttepmtsReached = dynamic(() => import('./register/popups/MaxSmsAttemptsReached'), { ssr: false });

const VerticalSpacing = styled.div`
  ${tw`[min-height: 20px]`}
`;

const RegisterContainer = styled.div`
  ${tw`relative flex flex-col h-full`}
`;

const RegisterFieldsContainer = styled.div`
  ${tw`flex flex-col flex-1 w-full h-full min-h-0 gap-4 px-5 overflow-auto bg-blue`}
`;

const RegisterPhoneFieldContainer = styled.div`
  ${tw`flex flex-col gap-4`}
`;

export default function Register() {
  useAccissbleRegister();

  const { forms, step, updateStep } = useStep();

  const { name, handleChangeName, handleResetName } = useFieldName();

  const { phone, handleChangePhone, handleResetPhone } = useFieldPhone();

  const { terms, handleChangeTerms } = useFieldTerms();

  const {
    popup,
    termsPopupType,
    handleChangePopup,
    handleOpenTermsPopup,
    handleConfirmRegisterQuit,
    handleClosePopup,
  } = usePopupHandler();

  const {
    isRenderVerifyField,
    isRenderTimer,

    verifyStatus,

    code,
    codeErrMsg,
    handleChangeCode,
    handleResetCode,

    handleSendVerifcationCode,
    handleReSendVerifcationCode,

    time,
    remainCount,
  } = useFieldVerificationPhone({ phone, updatePopupFunc: handleChangePopup, updateStepFunc: updateStep });

  const { isRenderCta, ctaTitle, disabledRegister, isLoadingRegister, handleRegisterCtas } = useRegisterHandlers({
    step,
    verifyStatus,
    name,
    phone,
    terms,
    updateStepFunc: updateStep,
    sendSmsCodeFunc: handleSendVerifcationCode,
  });

  return (
    <>
      <RegisterContainer>
        <RegisterHeader onClickClose={() => handleChangePopup('quit')} />
        <VerticalSpacing />
        <RegisterForm.Title step={step} />
        {step === REGISTER_STEP.TERMS ? <VerticalSpacing tw="[min-height: 40px]" /> : <VerticalSpacing />}

        <RegisterFieldsContainer id="formContainer">
          {forms?.includes(FIELD_ID.NAME) && !forms?.includes(FIELD_ID.TERMS) && (
            <RegisterForm.Name value={name} onChange={handleChangeName} handleClickReset={handleResetName} />
          )}

          {forms?.includes(FIELD_ID.PHONE) && !forms?.includes(FIELD_ID.TERMS) && (
            <RegisterPhoneFieldContainer id={FIELD_ID.PHONE}>
              <RegisterForm.Phone value={phone} onChange={handleChangePhone} handleClickReset={handleResetPhone} />
              <RegisterForm.PhoneVerification
                isRender={isRenderVerifyField}
                isRenderTimer={isRenderTimer}
                time={time}
                value={code}
                errorMessage={codeErrMsg}
                onChange={handleChangeCode}
                handleClickReset={handleResetCode}
                handleReSendVerifcationCode={handleReSendVerifcationCode}
              />
            </RegisterPhoneFieldContainer>
          )}

          {!isRenderCta && <VerticalSpacing tw="[min-height: 80px]" />}

          {forms?.includes(FIELD_ID.TERMS) && (
            <RegisterForm.Terms
              state={terms}
              onChangeState={handleChangeTerms}
              onOpenServiceTerms={() => {
                handleOpenTermsPopup('service');
              }}
              onOpenPrivacyPolicy={() => {
                handleOpenTermsPopup('privacy');
              }}
              onOpenLocationTerms={() => {
                handleOpenTermsPopup('location');
              }}
            />
          )}
        </RegisterFieldsContainer>

        <Cta
          isRenderCta={isRenderCta}
          title={ctaTitle}
          isLoading={isLoadingRegister}
          disabled={!disabledRegister}
          handleClick={handleRegisterCtas}
        />
      </RegisterContainer>

      {popup === 'quit' && <RegisterQuit handleConfirm={handleConfirmRegisterQuit} handleCancel={handleClosePopup} />}
      {popup === 'sendSms' && <SendSms remainCount={remainCount} handleConfirm={handleClosePopup} />}
      {popup === 'maxSmsAttemptsReached' && <MaxSmsAttepmtsReached handleConfirm={handleClosePopup} />}
      {popup === 'terms' && <TermsPopup type={termsPopupType} handleCancel={handleClosePopup} />}
    </>
  );
}
