import { memo, useCallback } from 'react';

import { Panel } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { useRouter } from '@/hooks/utils';

import ErrorCodes from '@/constants/error_codes';

import Routes from '@/router/routes';

import MyUpdatePhone from '@/components/domains/my/MyUpdatePhone';

import useMyUpdatePhone from '@/components/domains/my/my-update-phone/hooks/useMyUpdatePhone';

interface Props {
  depth: number;
  panelWidth?: string;
}

function UpdatePhonePc({ depth, panelWidth }: Props) {
  const router = useRouter(depth);

  const {
    phone,
    code,
    sent,
    codeVerified,
    errorCode,
    leftVerificationMinutes,
    leftVerificationSeconds,
    errorMessage,
    handleChangePhone,
    handleChangeCode,
    handleClickSend,
    handleClickVerifyCode,
    handleClickRemovePhoneValue,
  } = useMyUpdatePhone();

  const handleClickNext = useCallback(() => {
    if (router.query.trigger === 'iPin') {
      router.replace(Routes.VerifyCiSuccess, {
        persistParams: true,
        searchParams: { redirect: (router.query.redirect as string) ?? '' },
      });
    } else {
      router.replace(Routes.MyDetail);
    }
  }, [router]);

  const handleClickBack = useCallback(() => {
    router.replace(Routes.MyDetail);
  }, [router]);

  if (errorCode === ErrorCodes.MAX_SMS_ATTEMPS_REACHED) {
    return (
      <OverlayPresenter>
        <Popup>
          <Popup.ContentGroup tw="py-10">
            <Popup.Title>인증번호 발송 불가</Popup.Title>
            <Popup.Body>
              하루 최대 인증번호 발송 한도를 초과했습니다.
              <br />
              내일 다시 시도해 주세요.
            </Popup.Body>
          </Popup.ContentGroup>
          <Popup.ButtonGroup>
            <Popup.ActionButton onClick={() => router.pop()}>확인</Popup.ActionButton>
          </Popup.ButtonGroup>
        </Popup>
      </OverlayPresenter>
    );
  }

  return (
    <Panel width={panelWidth}>
      <MyUpdatePhone
        phone={phone}
        code={code}
        sent={sent}
        minutes={leftVerificationMinutes}
        seconds={leftVerificationSeconds}
        codeErrorMessage={errorCode !== null ? errorMessage : ''}
        codeVerified={codeVerified}
        onChangePhone={handleChangePhone}
        onChangeCode={handleChangeCode}
        onClickSend={handleClickSend}
        onClickVerifyCode={handleClickVerifyCode}
        onClickNext={handleClickNext}
        onClickBack={handleClickBack}
        onClickRemovePhoneValue={handleClickRemovePhoneValue}
      />
    </Panel>
  );
}

export default memo(UpdatePhonePc);
