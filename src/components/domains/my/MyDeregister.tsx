import { NavigationHeader } from '@/components/molecules';

import Container from '@/components/atoms/Container';

import useFetchDergisterStatus from '@/services/my/useFetchDergisterStatus';

import { CtaWrraper, NextStepButton, Title, DeregisterCta, FlexContents } from './deregister/widget/DeregisterWidget';

import Form from './deregister/Form';

import CautionConfirm from './deregister/CautionConfirm';

import useMyDergister from './deregister/hooks/useMyDergister';

import useStep from './deregister/hooks/useStep';

import useHandleClickBack from './deregister/hooks/useHandleClickBack';

import useCtasHandler from './deregister/hooks/useCtasHandler';

import SuccessPopup from './deregister/popups/SuccessPopup';

import ConfirmPopup from './deregister/popups/ConfirmPopup';

export default function MyDeregister() {
  const { deregisterReasons, extraReasons, handleChangeDeregisterReasons, handleChangeExtraReasons } = useMyDergister();

  const { data } = useFetchDergisterStatus();

  const { step, handleUpdateStep } = useStep();

  const { handleClickBack } = useHandleClickBack({ step, updateStep: handleUpdateStep });

  const reasons = extraReasons ? deregisterReasons?.join(',').concat(',', extraReasons) : deregisterReasons?.join('');

  const { popup, stepOneCta, stepTwoCta, handleDeregister, handleConfirmPopup, handleClosePopup } = useCtasHandler({
    updateStep: handleUpdateStep,
    reasons,
  });

  return (
    <>
      <Container>
        <NavigationHeader>
          {handleClickBack && <NavigationHeader.BackButton onClick={handleClickBack} />}
          <NavigationHeader.Title>회원탈퇴</NavigationHeader.Title>
          {step === 1 && <NextStepButton onClick={stepOneCta}>건너뛰기</NextStepButton>}
        </NavigationHeader>

        {step === 1 ? (
          <FlexContents>
            <Title>{`네고시오 탈퇴 이유를\n알려주세요`}</Title>
            <Form
              deregisterReasons={deregisterReasons}
              extraReasons={extraReasons}
              onChangeCheckbox={handleChangeDeregisterReasons}
              onChangeTextArea={handleChangeExtraReasons}
            />
          </FlexContents>
        ) : (
          <FlexContents>
            <CautionConfirm />
          </FlexContents>
        )}

        <CtaWrraper>
          {step === 1 && <DeregisterCta onClick={stepOneCta}>다음</DeregisterCta>}

          {step === 2 && (
            <DeregisterCta disabled={!data?.can_deregister} onClick={stepTwoCta}>
              탈퇴하기
            </DeregisterCta>
          )}
        </CtaWrraper>
      </Container>

      {popup === 'confirm' && <ConfirmPopup onClickCancel={handleClosePopup} onClickDeregister={handleConfirmPopup} />}
      {popup === 'success' && <SuccessPopup onClickNavigateToHome={handleDeregister} />}
    </>
  );
}
