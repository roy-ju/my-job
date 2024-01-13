import { updateCi } from '@/apis/user/updateCi';
import { OverlayPresenter } from '@/components/molecules';
import { VerifyCiPopup } from '@/components/organisms';
import { MobVerifyCi } from '@/components/templates';
import { NiceVerificationType } from '@/constants/enums';
import ErrorCodes from '@/constants/error_codes';
import useAuth from '@/hooks/services/useAuth';
import useNiceId, { NiceResponse } from '@/lib/nice/useNiceId';
import Routes from '@/router/routes';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

export default function VerifyCiWrraper() {
  const { mutate: mutateUser } = useAuth();
  const router = useRouter();

  const { request } = useNiceId();
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const handleNiceResponse = useCallback(
    async (res: NiceResponse) => {
      const updateCiRes = await updateCi({
        encData: res.encData,
        kie: res.kie,
        integrityValue: res.integrityValue,
        tokenVersionId: res.tokenVersionId,
        type: Number(res.type),
      });

      if (updateCiRes?.error_code) {
        setErrorCode(updateCiRes?.error_code);
      }

      if (!updateCiRes?.error_code) {
        mutateUser(false);
        if (Number(res.type) === NiceVerificationType.IPin) {
          router.replace({
            pathname: `/${Routes.EntryMobile}/${Routes.UpdatePhone}`,
            query: {
              redirect: router.query.redirect ?? '',
              trigger: 'iPin',
            },
          });
        } else {
          router.replace({
            pathname: `/${Routes.EntryMobile}/${Routes.VerifyCiSuccess}`,
            query: {
              redirect: router.query.redirect ?? '',
            },
          });
        }
      }
    },
    [router, mutateUser],
  );

  const handleVerifyPhone = useCallback(() => {
    request('phone', handleNiceResponse);
  }, [handleNiceResponse, request]);

  const handleVerifyIPin = useCallback(() => {
    request('ipin', handleNiceResponse);
  }, [handleNiceResponse, request]);

  const handleClickBack = useCallback(() => {
    if (typeof window !== 'undefined') {
      const canGoBack = window.history.length > 1;

      if (canGoBack) {
        router.back();
      } else {
        router.replace('/');
      }
    }
  }, [router]);

  return (
    <>
      <MobVerifyCi
        onClickBack={handleClickBack}
        onClickIPinVerification={handleVerifyIPin}
        onClickPhoneVerification={handleVerifyPhone}
      />

      {errorCode === ErrorCodes.DUPLCATED_CI && (
        <OverlayPresenter>
          <VerifyCiPopup.DuplicatedCi onClickClose={() => setErrorCode(null)} />
        </OverlayPresenter>
      )}

      {errorCode === ErrorCodes.UNDER_NINETEEN && (
        <OverlayPresenter>
          <VerifyCiPopup.Under19 onClickClose={() => setErrorCode(null)} />
        </OverlayPresenter>
      )}
    </>
  );
}
