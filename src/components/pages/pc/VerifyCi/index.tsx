import { updateCi } from '@/apis/user/updateCi';
import { Panel } from '@/components/atoms';
import { VerifyCi } from '@/components/templates';
import useNiceId, { NiceResponse } from '@/lib/nice/useNiceId';
import { memo, useCallback, useState } from 'react';

interface Props {
  depth: number;
  panelWidth?: string;
}

export default memo(({ panelWidth }: Props) => {
  const { request } = useNiceId();
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const handleNiceResponse = useCallback(async (res: NiceResponse) => {
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
  }, []);

  const handleVerifyPhone = useCallback(() => {
    request('phone', handleNiceResponse);
  }, [handleNiceResponse, request]);

  const handleVerifyIPin = useCallback(() => {
    request('ipin', handleNiceResponse);
  }, [handleNiceResponse, request]);

  console.log(errorCode);

  return (
    <Panel width={panelWidth}>
      <VerifyCi onClickIPinVerification={handleVerifyIPin} onClickPhoneVerification={handleVerifyPhone} />
    </Panel>
  );
});
