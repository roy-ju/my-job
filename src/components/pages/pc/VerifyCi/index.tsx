import { updateCi } from '@/apis/user/updateCi';
import { Panel } from '@/components/atoms';
import { OverlayPresenter } from '@/components/molecules';
import { VerifyCiPopup } from '@/components/organisms';
import { VerifyCi } from '@/components/templates';
import ErrorCodes from '@/constants/error_codes';
import { useAuth } from '@/hooks/services';
import { useRouter } from '@/hooks/utils';
import useNiceId, { NiceResponse } from '@/lib/nice/useNiceId';
import Routes from '@/router/routes';
import { memo, useCallback, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ depth, panelWidth }: Props) => {
  const { mutate: mutateUser } = useAuth();
  const router = useRouter(depth);

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
        router.replace(Routes.VerifyCiSuccess, { searchParams: { redirect: (router.query.redirect as string) ?? '' } });
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
    <Panel width={panelWidth}>
      <VerifyCi onClickIPinVerification={handleVerifyIPin} onClickPhoneVerification={handleVerifyPhone} />
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
    </Panel>
  );
});
