import { NavigationHeader } from '@/components/molecules';

import LegacyVerifyCi from '@/components/templates/LegacyVerifyCi';

import CloseIcon from '@/assets/icons/close_24.svg';

import { useRouter } from 'next/router';

import { useCallback, useState } from 'react';

import useNiceId, { NiceResponse } from '@/lib/nice/useNiceId';

import useFetchAgreementInfo from '@/services/my/useFetchMyAgreementInfo';

import { Loading } from '@/components/atoms';

import Routes from '@/router/routes';

import { apiService } from '@/services';

export default function OwnerVerificationCi() {
  const router = useRouter();
  const { request } = useNiceId();

  const [isLoading, setIsLoading] = useState(false);

  const loi = router.query.loi as string;

  const token = router.query.t as string;

  const { mutate, isLoading: isLoadingAgreementInfo } = useFetchAgreementInfo(loi, token);

  const handleNiceResponse = useCallback(
    async (res: NiceResponse) => {
      if (!token || !loi) return;

      setIsLoading(true);

      await apiService.myAgreementComplete({
        enc_data: res.encData,
        kie: res.kie,
        integrity_value: res.integrityValue,
        token_version_id: res.tokenVersionId,
        type: Number(res.type),
        token,
        loi: Number(loi),
      });

      await mutate();

      setIsLoading(false);

      router.back();
    },
    [token, loi, mutate, router],
  );

  const handleVerifyPhone = useCallback(() => {
    request('phone', handleNiceResponse);
  }, [handleNiceResponse, request]);

  const handleVerifyIPin = useCallback(() => {
    request('ipin', handleNiceResponse);
  }, [handleNiceResponse, request]);

  if (isLoadingAgreementInfo || !loi || isLoading) {
    return (
      <div tw="py-20">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div tw="w-full absolute bg-nego-1300 h-full [z-index: -1]" />
      <div tw="w-full left-0 right-0 flex flex-col h-full mx-auto bg-white fixed">
        <NavigationHeader>
          <NavigationHeader.Title>본인인증 및 동의</NavigationHeader.Title>
          <NavigationHeader.Button onClick={() => router.replace(`/${Routes.EntryMobile}`)}>
            <CloseIcon />
          </NavigationHeader.Button>
        </NavigationHeader>
        <div tw="flex-1 min-h-0 overflow-auto -mt-7">
          <LegacyVerifyCi
            subTitle="소유자 확인을 위해 본인인증이 필요합니다."
            onClickPhoneVerification={handleVerifyPhone}
            onClickIPinVerification={handleVerifyIPin}
          />
        </div>
      </div>
    </>
  );
}
