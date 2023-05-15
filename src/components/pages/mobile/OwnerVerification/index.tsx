import useAPI_GetAgreementInfo from '@/apis/listing/getAgreementInfo';
import { OwnerVerification as Template, OwnerVerificationComplete as CompleteTemplate } from '@/components/templates';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import ErrorCodes from '@/constants/error_codes';
import Routes from '@/router/routes';
import { OverlayPresenter, Popup } from '@/components/molecules';

export default function OwnerVerification() {
  const router = useRouter();

  const token = router.query.t as string;
  const loi = router.query.loi as string;

  const { data, isLoading } = useAPI_GetAgreementInfo(loi, token);

  const handleVerify = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/ov/ci?t=${router.query.t}&loi=${router.query.loi}`);
  }, [router]);

  return (
    <>
      <div tw="w-full absolute bg-nego-1300 h-full [z-index: -1]" />
      <div tw="w-full max-w-mobile left-0 right-0 flex flex-col h-full mx-auto bg-white fixed">
        {!data?.error_code && (
          <Template
            isLoading={!(token && loi) || isLoading}
            address={data?.full_road_name_address}
            approverName={data?.approver_name}
            onClickVerify={handleVerify}
          />
        )}
        {data?.error_code === ErrorCodes.ALREADY_VERIFIED && <CompleteTemplate onClickHome={() => router.push('/m')} />}
        {data?.error_code === ErrorCodes.LISTING_DOES_NOT_EXIST && (
          <OverlayPresenter>
            <Popup>
              <Popup.ContentGroup>
                <Popup.Title>해당 매물등록신청이 유효하지 않습니다.</Popup.Title>
              </Popup.ContentGroup>
              <Popup.ButtonGroup>
                <Popup.ActionButton onClick={() => router.push(`/${Routes.EntryMobile}`)}>확인</Popup.ActionButton>
              </Popup.ButtonGroup>
            </Popup>
          </OverlayPresenter>
        )}
      </div>
    </>
  );
}
