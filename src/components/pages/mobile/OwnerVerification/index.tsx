import useAPI_GetAgreementInfo from '@/apis/listing/getAgreementInfo';
import { OwnerVerification as Template, OwnerVerificationComplete as CompleteTemplate } from '@/components/templates';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import ErrorCodes from '@/constants/error_codes';
import Routes from '@/router/routes';
import { OverlayPresenter, Popup } from '@/components/molecules';
import { MobileContainer } from '@/components/atoms';

export default function OwnerVerification() {
  const router = useRouter();

  const token = router.query.t as string;
  const loi = router.query.loi as string;

  const { data, isLoading } = useAPI_GetAgreementInfo(loi, token);

  const handleVerify = useCallback(() => {
    router.push(`/${Routes.EntryMobile}/ov/ci?t=${router.query.t}&loi=${router.query.loi}`);
  }, [router]);

  return (
    <MobileContainer>
      {!data?.error_code && (
        <Template
          isLoading={!(token && loi) || isLoading}
          address={data?.full_road_name_address}
          approverName={data?.approver_name}
          price={data?.trade_or_deposit_price}
          monthlyRentFee={data?.monthly_rent_fee}
          buyOrRent={data?.buy_or_rent}
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
    </MobileContainer>
  );
}
