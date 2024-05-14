import dynamic from 'next/dynamic';

import Container from '@/components/atoms/Container';

import SeperatorV2 from '@/components/atoms/SeperatorV2';

import { MarginTopTwentyFour } from '@/components/atoms/Margin';

import { NavigationHeader, TextField } from '@/components/molecules';

import { regPhone } from '@/utils/regex';

import DeleteIcon from '@/assets/icons/close_contained.svg';

import useRegisterHomeAgreementHandler from './register-home-agreement/hooks/useRegisterHomeAgreementHandler';

import useHandleClickBack from './registered-homes/hooks/useHandleClickBack';

import InvalidPhone from './register-home-agreement/InvalidPhone';

import Notification from './register-home-agreement/Notification';

import Ctas from './register-home-agreement/Ctas';

import {
  ColumnGap3,
  FlexContents,
  TitleWrraper,
  Title,
  SubTitle,
  Info,
  SecondInfo,
} from './register-home-agreement/widget/RegisterHomeAgreementWidget';

const InvalidAccessPopup = dynamic(() => import('@/components/organisms/popups/InvalidAccessPopup'), {
  ssr: false,
});

const SendCountReachedPopup = dynamic(() => import('./register-home-agreement/popups/SendCountReachedPopup'), {
  ssr: false,
});

const ConfirmPopup = dynamic(() => import('./register-home-agreement/popups/ConfirmPopup'), { ssr: false });

const InvalidOwnerPopup = dynamic(() => import('./register-home-agreement/popups/InvalidOwnerPopup'), { ssr: false });

export default function RegisterHomeAgreement() {
  const { renderBackButtonUi, handleClickBack } = useHandleClickBack();

  const {
    popup,
    title,
    subTitle,
    userName,
    name,
    phone,
    isResend,
    handleClickCTA,
    handleClosePopup,
    handleChangeName,
    handleClickNameDeleteIcon,
    handleChangePhone,
    handleClickPhoneDeleteIcon,
    handleRedirectHome,
    handleClickSendCountReachedPopupCta,
  } = useRegisterHomeAgreementHandler();

  return (
    <>
      <Container>
        <NavigationHeader>
          {renderBackButtonUi && <NavigationHeader.BackButton onClick={handleClickBack} />}
          <NavigationHeader.Title>우리집 등록</NavigationHeader.Title>
        </NavigationHeader>

        <TitleWrraper>
          <p>등록 신청 주소</p>
          {title && <Title>{title}</Title>}
          {subTitle && <SubTitle>{subTitle}</SubTitle>}
        </TitleWrraper>
        <SeperatorV2 />
        <FlexContents>
          {isResend ? (
            <Info>소유자 인증요청 문자를 재발송 하시겠습니까?</Info>
          ) : (
            <Info>
              등기부 조회 결과,
              <br />
              {userName}님이 소유자로 확인되지 않았습니다.
              <br />
              소유자의 대리인으로 우리집 등록하시겠습니까?
            </Info>
          )}
          <SecondInfo>우리집 등록 신청을 위해 소유자 동의가 필요합니다.</SecondInfo>
          <ColumnGap3>
            <TextField variant="outlined">
              <TextField.Input
                label={name ? '소유자 성명' : '소유자 성명 입력'}
                value={name}
                onChange={(e) => {
                  handleChangeName(e);
                }}
              />
              {name && handleClickNameDeleteIcon && (
                <TextField.Trailing tw="pr-4 cursor-pointer" onClick={handleClickNameDeleteIcon}>
                  <DeleteIcon />
                </TextField.Trailing>
              )}
            </TextField>

            <TextField variant="outlined" hasError={phone ? !regPhone.test(phone) : false}>
              <TextField.PatternInput
                format="###-####-####"
                label={phone ? '소유자 휴대폰 번호' : '소유자 휴대폰 번호 입력'}
                value={phone}
                onChange={(e) => {
                  handleChangePhone(e);
                }}
              />
              {phone && handleClickPhoneDeleteIcon && (
                <TextField.Trailing tw="pr-4 cursor-pointer" onClick={handleClickPhoneDeleteIcon}>
                  <DeleteIcon />
                </TextField.Trailing>
              )}
            </TextField>
          </ColumnGap3>
          {phone && !regPhone.test(phone) ? <InvalidPhone /> : <MarginTopTwentyFour />}
          <Notification />
        </FlexContents>
        <Ctas disabled={!name || !phone || !regPhone.test(phone)} handleClick={handleClickCTA} />
      </Container>

      {popup === 'inactive' && (
        <InvalidAccessPopup message="유효하지 않은 접근입니다." handleConfirm={handleRedirectHome} />
      )}

      {popup === 'confirm' && (
        <ConfirmPopup name={name} phone={phone} handleCancel={handleClosePopup} handleConfirm={handleClickCTA} />
      )}

      {popup === 'sendCountReached' && <SendCountReachedPopup handleConfirm={handleClickSendCountReachedPopupCta} />}

      {popup === 'invalidOwner' && <InvalidOwnerPopup name={name} handleConfirm={handleClosePopup} />}
    </>
  );
}
