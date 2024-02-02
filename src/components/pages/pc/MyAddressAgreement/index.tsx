import { memo, useState, useEffect, ChangeEventHandler, useCallback } from 'react';

import { useRouter as useNextRouter } from 'next/router';

import { toast } from 'react-toastify';

import { AuthRequired, Panel } from '@/components/atoms';

import { OverlayPresenter, Popup } from '@/components/molecules';

import { MyAddressAgreement } from '@/components/templates';

import { useRouter } from '@/hooks/utils';

import ErrorCodes from '@/constants/error_codes';

import { autoHyphenPhone } from '@/utils/autoHypenPhone';

import addressAgreementPhone from '@/apis/my/addressAgreementPhone';

import Routes from '@/router/routes';

interface Props {
  depth: number;
  panelWidth: string;
}

type AddressData = {
  addressName?: string;
  categoryName?: string;
  id?: string;
  lat?: number;
  lng?: number;
  placeName?: string;
  roadAddressName?: string;
};

export default memo(({ depth, panelWidth }: Props) => {
  const router = useRouter(depth);
  const nextRouter = useNextRouter();

  const [showInactivePopup, setShowInactivePopup] = useState(false);

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const [showInvalidOwnerPopup, setShowInvalidOwnerPopup] = useState(false);

  const [showSendCountReachedPopup, setShowSendCountReachedPopup] = useState(false);

  const [addressData, setAddressData] = useState<AddressData>();
  const [dong, setDong] = useState<string>('');
  const [ho, setHo] = useState<string>('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleChangeName = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setName(e.target.value);
  }, []);

  const handleChangePhone = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setPhone(e.target.value);
  }, []);

  const handleClickNameDeleteIcon = useCallback(() => {
    setName('');
  }, []);

  const handleClickPhoneDeleteIcon = useCallback(() => {
    setPhone('');
  }, []);

  const handleClickHome = () => {
    nextRouter.replace('/');
  };

  const handleShowPopup = useCallback(() => setShowConfirmPopup(true), []);

  const handleClickCTA = useCallback(async () => {
    if (!router?.query?.userAddressID) return;

    const response = await addressAgreementPhone({
      name,
      phone,
      user_address_id: Number(router.query.userAddressID),
    });

    setShowConfirmPopup(false);

    if (response?.error_code === ErrorCodes.UNABLE_TO_VALIDATE_OWNER) {
      setShowInvalidOwnerPopup(true);
    } else if (response?.error_code === ErrorCodes.SMS_COUNT_REACHED_LIMIT) {
      setShowSendCountReachedPopup(true);
    } else if (response === null) {
      toast.success('문자를 전송했습니다.');

      router.replace(Routes.MyRegisteredHomes, {
        searchParams: {
          ...(router?.query?.danjiID ? { danjiID: router.query.danjiID as string } : {}),
          ...(router?.query?.suggestID ? { suggestID: router.query.suggestID as string } : {}),
        },
        state: {
          ...(router.query.origin
            ? {
                origin: router.query.origin as string,
              }
            : {}),
        },
      });
    }
  }, [name, phone, router]);

  useEffect(() => {
    if (!router?.query?.userAddressID) {
      setShowInactivePopup(true);

      return;
    }

    if (!router?.query?.addressData && (!router?.query?.roadNameAddress || !router?.query?.addressDetail)) {
      setShowInactivePopup(true);

      return;
    }

    if (router?.query?.addressData) {
      const addressD = JSON.parse(decodeURIComponent(router.query.addressData as string));
      setAddressData(addressD);
    }

    if (router?.query?.dong) {
      setDong(router.query.dong as string);
    }

    if (router?.query?.ho) {
      setHo(router.query.ho as string);
    }
  }, [router]);

  return (
    <AuthRequired depth={depth} ciRequired>
      <Panel width={panelWidth}>
        {!showInactivePopup && (
          <MyAddressAgreement
            addressData={addressData}
            roadNameAddress={(router?.query?.roadNameAddress as string) || ''}
            addressDetail={(router?.query?.addressDetail as string) || ''}
            dong={dong}
            ho={ho}
            name={name}
            phone={phone}
            isResend={!!router?.query?.resend}
            onChangeName={handleChangeName}
            onChangePhone={handleChangePhone}
            onClickNameDeleteIcon={handleClickNameDeleteIcon}
            onClickPhoneDeleteIcon={handleClickPhoneDeleteIcon}
            onClickCTA={handleShowPopup}
          />
        )}
      </Panel>

      {showInactivePopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.SubTitle tw="text-center">유효하지 않은 접근입니다.</Popup.SubTitle>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={handleClickHome}>네고시오 홈으로 돌아가기</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {showConfirmPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.SubTitle tw="text-center">소유자 정보 확인</Popup.SubTitle>
              <Popup.Body>
                아래의 정보로 소유자 동의를 위한 문자가 전송됩니다.
                <br />
                <br />
                소유자 성명 : {name}
                <br />
                휴대폰 번호 : {autoHyphenPhone(phone)}
              </Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.CancelButton onClick={() => setShowConfirmPopup(false)}>수정하기</Popup.CancelButton>
              <Popup.ActionButton onClick={handleClickCTA}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {showInvalidOwnerPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.SubTitle tw="text-center">소유자 정보 확인</Popup.SubTitle>
              <Popup.Body>
                아래의 입력하신 소유자 성명이 등기부상의 소유자와 일치하지 않습니다. 확인 후 다시 입력해주세요.
                <br />
                <br />
                입력하신 소유자 성명 : {name}
              </Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => setShowInvalidOwnerPopup(false)}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}

      {showSendCountReachedPopup && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup tw="py-6">
              <Popup.SubTitle tw="text-center">일 발송 횟수 제한</Popup.SubTitle>
              <Popup.Body>
                하루 최대 5건의 문자 발송이 가능합니다.
                <br />
                내일 다시 시도해주세요.
              </Popup.Body>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton
                onClick={() => {
                  setShowSendCountReachedPopup(false);
                  if (router?.query?.danjiID || router?.query?.suggestID) {
                    router.pop();
                  } else {
                    nextRouter.replace(`/${Routes.My}?default=2`);
                  }
                }}
              >
                확인
              </Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </AuthRequired>
  );
});
