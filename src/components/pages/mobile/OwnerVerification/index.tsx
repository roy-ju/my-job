import useAPI_GetAgreementInfo from '@/apis/listing/getAgreementInfo';
import { OwnerVerification as Template, OwnerVerificationComplete as CompleteTemplate } from '@/components/templates';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import ErrorCodes from '@/constants/error_codes';

export default function OwnerVerification() {
  const router = useRouter();

  const token = router.query.t as string;
  const loi = router.query.loi as string;

  const { data, isLoading } = useAPI_GetAgreementInfo(loi, token);

  const handleVerify = useCallback(() => {
    router.push(`ov/ci?t=${router.query.t}&loi=${router.query.loi}`);
  }, [router]);

  return (
    <>
      <div tw="w-full absolute bg-nego-1300 h-full [z-index: -1]" />
      <div tw="w-full max-w-mobile left-0 right-0 flex flex-col h-full mx-auto bg-white fixed">
        {!data?.error_code && (
          <Template
            isLoading={!(token && loi) || isLoading}
            address={data?.full_road_name_address}
            onClickVerify={handleVerify}
          />
        )}
        {data?.error_code === ErrorCodes.ALREADY_VERIFIED && <CompleteTemplate onClickHome={() => router.push('/m')} />}
      </div>
    </>
  );
}
