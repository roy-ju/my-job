import { NavigationHeader, OverlayPresenter, Popup } from '@/components/molecules';
import { VerifyCi } from '@/components/templates';
import CloseIcon from '@/assets/icons/close_24.svg';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import useNiceId, { NiceResponse } from '@/lib/nice/useNiceId';
import completeAgreement from '@/apis/listing/completeAgreement';
import ErrorCodes from '@/constants/error_codes';
import useAPI_GetAgreementInfo from '@/apis/listing/getAgreementInfo';
import { Loading } from '@/components/atoms';

export default function OwnerVerificationCi() {
  const router = useRouter();
  const { request } = useNiceId();

  const [errorCode, setErrorCode] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = router.query.t as string;
  const loi = router.query.loi as string;

  const { mutate, isLoading: isLoadingAgreementInfo } = useAPI_GetAgreementInfo(loi, token);

  const handleNiceResponse = useCallback(
    async (res: NiceResponse) => {
      setIsLoading(true);
      const ciRes = await completeAgreement({
        enc_data: res.encData,
        kie: res.kie,
        integrity_value: res.integrityValue,
        token_version_id: res.tokenVersionId,
        type: Number(res.type),
        loi: Number(loi),
        token,
      });

      if (ciRes?.error_code) {
        setIsLoading(false);
        setErrorCode(ciRes?.error_code);
      }

      if (!ciRes?.error_code) {
        await mutate();
        setIsLoading(false);
        router.back();
      }
    },
    [router, token, loi, mutate],
  );

  const handleVerifyPhone = useCallback(() => {
    request('phone', handleNiceResponse);
  }, [handleNiceResponse, request]);

  const handleVerifyIPin = useCallback(() => {
    request('ipin', handleNiceResponse);
  }, [handleNiceResponse, request]);

  if (isLoadingAgreementInfo || !token || !loi || isLoading) {
    return (
      <div tw="py-20">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div tw="w-full absolute bg-nego-1300 h-full [z-index: -1]" />
      <div tw="w-full max-w-mobile left-0 right-0 flex flex-col h-full mx-auto bg-white fixed">
        <NavigationHeader>
          <NavigationHeader.Title>본인인증 및 동의</NavigationHeader.Title>
          <NavigationHeader.Button>
            <CloseIcon />
          </NavigationHeader.Button>
        </NavigationHeader>
        <div tw="flex-1 min-h-0 overflow-auto -mt-7">
          <VerifyCi
            subTitle="소유자 확인을 위해 본인인증이 필요합니다."
            onClickPhoneVerification={handleVerifyPhone}
            onClickIPinVerification={handleVerifyIPin}
          />
        </div>
      </div>
      {errorCode === ErrorCodes.ALREADY_VERIFIED && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>이미 인증되었습니다.</Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => setErrorCode(null)}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
      {errorCode === ErrorCodes.UNABLE_TO_VALIDATE_OWNER && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>매물소유자 명의로 본인인증이 필요합니다.</Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => setErrorCode(null)}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
      {errorCode === ErrorCodes.LISTING_DOES_NOT_EXIST && (
        <OverlayPresenter>
          <Popup>
            <Popup.ContentGroup>
              <Popup.Title>해당 매물등록신청이 유효하지 않습니다.</Popup.Title>
            </Popup.ContentGroup>
            <Popup.ButtonGroup>
              <Popup.ActionButton onClick={() => setErrorCode(null)}>확인</Popup.ActionButton>
            </Popup.ButtonGroup>
          </Popup>
        </OverlayPresenter>
      )}
    </>
  );
}
