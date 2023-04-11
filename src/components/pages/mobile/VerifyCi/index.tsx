import { updateCi } from '@/apis/user/updateCi';
import { OverlayPresenter } from '@/components/molecules';
import { VerifyCiPopup } from '@/components/organisms';
import { MobVerifyCi } from '@/components/templates';
import ErrorCodes from '@/constants/error_codes';
import { useAuth } from '@/hooks/services';
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
        router.replace(`/${Routes.EntryMobile}/${Routes.VerifyCiSuccess}`);
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

  return (
    <>
      <MobVerifyCi onClickIPinVerification={handleVerifyIPin} onClickPhoneVerification={handleVerifyPhone} />

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
